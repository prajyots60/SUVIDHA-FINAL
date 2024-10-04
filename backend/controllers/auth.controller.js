import User from "../models/user.model.js";
import {redis} from "../lib/redis.js";
import jwt from "jsonwebtoken";



//generate access token and refresh token
const generateTokens = (userId) => {
  const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});

  const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});

  return {accessToken, refreshToken};
};


//store refresh token in redis for 7 days
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(`refresh_Token:${userId}`, refreshToken, "EX", 7*24*60*60); 
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, //cookie cannot be accessed by client side scripts
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevents CSRF attacks
    maxAge: 15*60*1000  //15 minutes
  })
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, //cookie cannot be accessed by client side scripts
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevents CSRF attacks
    maxAge: 7*24*60*60*1000  //7 days
  })
}

export const signup = async (req, res) => {
  const {email, password, name} = req.body;
  try {
    const userExists = await User.findOne({email});  //check if user exists

    if(userExists) return res.status(400).json({message: "User already exists"});

    const user = await User.create({name, email, password});  //create new user

    //authenticate
    const {accessToken, refreshToken} = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken); //store refresh token in redis
    setCookies(res, accessToken, refreshToken);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({message: "Signup error controller", error: error.message});
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});  //check if user exists

    if(!user) return res.status(400).json({message: "User does not exist"});

    if(user && (await user.comparePassword(password)) ){
      const {accessToken, refreshToken} = generateTokens(user._id);

      await storeRefreshToken(user._id, refreshToken); //store refresh token in redis

      setCookies(res, accessToken, refreshToken);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({message: "Invalid credentials"});
    }
  } catch (error) {
    res.status(500).json({message: "Login error controller", error: error.message});
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_Token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({message: "Logged out successfully"});
  } catch (error) {
    res.status(500).json({message: "Logout error controller", error: error.message});
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return res.status(401).json({message: "No refresh token provided"});

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const storedToken = await redis.get(`refresh_Token:${decoded.userId}`);

    if(storedToken !== refreshToken) {
      return res.status(401).json({message: "Invalid refresh token"});
    }
    const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});

    res.cookie("accessToken", accessToken, {
      httpOnly: true, //cookie cannot be accessed by client side scripts
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", //prevents CSRF attacks
      maxAge: 15*60*1000  //15 minutes
    });

    res.json({message: "Refresh token generated successfully"});
  } catch (error) {
    console.log("Error in refresh token controller:", error.message);
    res.status(500).json({message: "Server error", error: error.message});
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user contains the authenticated user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      _id: user._id,
       name: user.name,
       email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Update user details
export const updateUser = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the authenticated user
  const { name, email } = req.body; // Get new name and email from request body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true } // Ensure validation is run
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser); // Return the updated user data
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    // Assuming the user is available in req.user from the middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the password
    user.password = newPassword; // Assuming you have a method to hash it
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};


