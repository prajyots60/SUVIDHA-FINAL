import { useState } from 'react';
import heroImage from '../assets/images/hero_bg.jpg'; // Update the path as needed

const Hero = () => {
  const [location, setLocation] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [serviceProvider, setServiceProvider] = useState('');
  const [serviceType, setServiceType] = useState('');

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', { location, serviceProvider, serviceType });
  };

  return (
    <section 
      className="relative bg-cover bg-center bg-gray-100" 
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative container mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-4xl font-bold text-white">Find Your Service Provider</h1>
        <p className="mt-4 text-white">Served 25k plus requests all over India</p>
        
        {/* Input Fields */}
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          
          {/* Location Input */}
          <input 
            type="text" 
            placeholder="City, Zip" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded-full w-full md:w-1/3 text-sm focus:outline-none focus:ring-2 text-gray-700 focus:ring-purple-600"
          />
          
          
          
          {/* Type of Service Dropdown */}
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="border p-2 rounded-full w-full md:w-1/3 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="" disabled>
              Select Type of Service
            </option>
            <option value="cleaning">Cleaning</option>
            <option value="repair">Repair</option>
            <option value="painting">Painting</option>
            <option value="shifting">Shifting</option>
            <option value="plumber">Plumber</option>
            <option value="electric">Electrician</option>
          </select>
        </div>
        
        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="mt-8 bg-purple-600 text-white px-12 py-2 rounded-full text-lg font-semibold transform transition duration-300 hover:scale-110 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero;
