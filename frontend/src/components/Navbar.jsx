import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, LogOut, Lock, Briefcase } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer"; // Check if the user is a customer

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/add-vendor');  // Navigate to the AddVendor page
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Branding */}
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Suvidha
        </Link>

        {/* Links */}
        <div className="flex items-center">
          {/* Dashboard for Vendors (Admins) */}
          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="mr-4 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md flex items-center transition duration-300 ease-in-out"
            >
              <Lock className="mr-2" size={18} />
              Dashboard
            </Link>
          )}

          {/* Registration for Customers (Users) */}
          {isCustomer && (
            <button
              onClick={handleRegisterClick}
              className="mr-4 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md flex items-center transition duration-300 ease-in-out"
            >
              <Briefcase className="mr-2" size={18} />
              Register as Vendor
            </button>
          )}

          {/* User Auth - Logged In */}
          {user ? (
            <button
              onClick={logout}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
            >
              <LogOut size={18} />
              <span className="ml-2">Log Out</span>
            </button>
          ) : (
            // User Auth - Logged Out
            <>
              <Link
                to="/login"
                className="mr-4 text-purple-600 hover:text-purple-700 transform transition duration-300 hover:scale-110 flex items-center"
              >
                <LogIn className="mr-2" size={18} />
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 text-white px-4 py-2 rounded-md transform transition duration-300 hover:scale-110 hover:bg-purple-700 flex items-center"
              >
                <UserPlus className="mr-2" size={18} />
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
