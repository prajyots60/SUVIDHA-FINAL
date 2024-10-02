import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

// Import the vendor management pages
import Home from './pages/Home';
import AddVendor from './pages/AddVendor';
import EditVendor from './pages/EditVendor';
import VendorProfile from './pages/VendorProfile';
import VendorList from "./components/VendorList";

// Import Auth pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';

// Import user store and loading spinner
import { useUserStore } from "./stores/useUserStore.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="App min-h-screen bg-gray-900 text-white relative overflow-hidden">
        {/* Background gradient */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-50 pt-20">
          <Navbar />
          <Routes>
            {/* Route for the homepage */}
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <VendorList />
                <CallToAction />
              </>
            } />

            {/* Routes for vendor management */}
            <Route path="/vendor-management" element={<Home />} />
            <Route path="/add-vendor" element={<AddVendor />} />
            <Route path="/edit-vendor/:id" element={<EditVendor />} />
            <Route path="/vendor/:id" element={<VendorProfile />} />

            {/* Authentication routes */}
            <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
            <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          </Routes>

          <Footer />
        </div>

        {/* Toaster notifications */}
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
