import { Link } from 'react-router-dom';
import { UserPlus, LogIn, LogOut, Lock, Briefcase, CircleUserRound } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer"; // Check if the user is a customer

  return (
    <nav className="fixed top-0 left-0 w-full bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.5)_0%,rgba(75,0,130,0.4)_50%,rgba(0,0,0,0.3)_100%)] shadow-md z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Branding */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-white">
            Suvidha
          </Link>

          {/* Navigation Links - Home, Services, Contact Us */}
          <Link to="/" className="text-white hover:text-purple-300 px-3 py-2 transition duration-300 ease-in-out">
            Home
          </Link>

          <Link to="/services" className="text-white hover:text-purple-300 px-3 py-2 transition duration-300 ease-in-out">
            Services
          </Link>

          <Link to="/contact" className="text-white hover:text-purple-300 px-3 py-2 transition duration-300 ease-in-out">
            Contact Us
          </Link>
        </div>

        {/* Links */}
        <div className="flex items-center">
          {/* Dashboard for Vendors (Admins) */}
          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="mr-4 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md flex items-center transition duration-300 ease-in-out"
            >
              <Lock className="mr-2 text-white" size={18} />
              Dashboard
            </Link>
          )}

          {/* Registration for Customers (Users) */}
          {isCustomer && (
            <Link
              to="/add-vendor"
              className="mr-4 flex items-center transition duration-300 ease-in-out relative group"
            >
              <Briefcase className="mr-2 text-white group-hover:text-purple-300 transition duration-300" size={22} />
              <span className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                Register as Vendor
              </span>
            </Link>
          )}

          {/* User Auth - Logged In */}
          {user ? (
            <>
              {/* Profile Link */}
              {!isAdmin && (
                <Link
                  to="/profile"
                  className="mr-4 text-white hover:text-purple-300 flex items-center transition duration-300 ease-in-out"
                >
                  <CircleUserRound className="mr-2 text-white" size={22} />
                  Profile
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={logout}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogOut className="text-white" size={18} />
                <span className=""></span>
              </button>
            </>
          ) : (
            // User Auth - Logged Out
            <>
              <Link
                to="/login"
                className="mr-4  text-white hover:text-purple-300 transform transition duration-300 hover:scale-110 flex items-center"
              >
                <LogIn className="mr-2 text-white" size={18} />
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 text-white px-4 py-2 rounded-md transform transition duration-300 hover:scale-110 hover:bg-purple-700 flex items-center"
              >
                <UserPlus className="mr-2 text-white" size={18} />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
