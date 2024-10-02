
// import heroImage from '../assets/images/hero_bg.jpg'; // Update the path as needed

// const Hero = () => {
//   return (
//     <section 
//       className="bg-cover bg-center bg-gray-100" 
//       style={{ backgroundImage: `url(${heroImage})` }}
//     >
//       <div className="container mx-auto px-4 py-16 text-center text-white">
//         <h1 className="text-4xl font-bold text-purple-600">Find Your Service Provider</h1>
//         <p className="mt-4 text-black">Served 25k plus requests all over India</p>
//         <div className="mt-8">
//           <input 
//             type="text" 
//             placeholder="Address, School, City, Zip or Neighborhood" 
//              className="border p-2 rounded-full w-full md:w-1/3 text-sm"
//           />
//           <input 
//             type="text" 
//             placeholder="Service provider, Type of service" 
//              className="border p-2 rounded-full w-full md:w-1/3 text-sm"
//           />
//         </div>
//         <button className="mt-6 bg-purple-600 text-white px-8 py-2 rounded-full">
//           Search
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Hero;








import heroImage from '../assets/images/hero_bg.jpg'; // Update the path as needed

const Hero = () => {
  return (
    <section 
      className="relative bg-cover bg-center bg-gray-100" 
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative container mx-auto px-4 py-16 text-center text-black">
        <h1 className="text-4xl font-bold text-white">Find Your Service Provider</h1>
        <p className="mt-4 text-white">Served 25k plus requests all over India</p>
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <input 
            type="text" 
            placeholder=" City, Zip " 
            className="border p-2 rounded-full w-full md:w-1/3 text-sm" // Adjusted width and text size
          />
          <input 
            type="text" 
            placeholder="Service provider, Type of service" 
            className="border p-2 rounded-full w-full md:w-1/3 text-sm" // Adjusted width and text size
          />
        </div>
        <button 
          className="mt-8 bg-purple-600 text-white px-12 py-2 rounded-full text-lg font-semibold transform transition duration-300 hover:scale-110 hover:bg-purple-700"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero;

