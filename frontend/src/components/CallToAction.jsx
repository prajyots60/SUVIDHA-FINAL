import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();  // Get the navigate function

  const handleRegisterClick = () => {
    navigate('/add-vendor');  // Navigate to the AddVendor page
  };

  return (
    <section className="py-12 bg-purple-600 text-white text-center">
      <h2 className="text-3xl font-bold">List Your Service To The World.</h2>
      <p className="mt-4">Register your business on our platform to reach out to the world and grow together.</p>
      <button 
        className="mt-6 bg-white text-purple-600 px-8 py-2 rounded transform transition duration-300 hover:scale-110 hover:bg-gray-300" 
        onClick={handleRegisterClick}  // Add the onClick handler
      >
        Register Now
      </button>
    </section>
  );
};

export default CallToAction;
