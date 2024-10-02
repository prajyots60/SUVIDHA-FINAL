// eslint-disable-next-line react/prop-types
const VendorCard = ({ name, address, image, description, location, category, email }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded transform transition duration-300 hover:scale-105 hover:bg-purple-100 flex">
      {/* Left Side: Profile Information */}
      <div className="w-3/4 pr-6">
        {/* Profile Image */}
        <img
          src={image}
          alt={name}
          className="rounded-full w-24 h-24 mx-auto border-4 border-purple-400"
        />

        {/* Name */}
        <h3 className="mt-4 font-bold text-xl text-center text-purple-800">{name}</h3>

        {/* Email */}
        {email && (
          <p className="text-gray-700 text-center mt-1">{email}</p>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-700 text-center mt-2 px-4 italic">{description}</p>
        )}

        {/* Address */}
        <p className="text-gray-600 text-center mt-2">{address}</p>

        {/* Book Service Button */}
        <div className="flex justify-center mt-4">
          <a
            href={`/vendors/${name}/book`} // Adjust this link as necessary for your routing
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
          >
            Book Service
          </a>
        </div>
      </div>

      {/* Right Side: Location and Category */}
      <div className="w-1/4 pl-6 border-l border-purple-200 text-left">
        {/* Displaying Location */}
        <div className="text-gray-600 text-sm mb-4">
          <span className="font-semibold text-purple-800">Location: </span>{location || "N/A"}
        </div>
        
        {/* Displaying Category */}
        <div className="text-gray-600 text-sm">
          <span className="font-semibold text-purple-800">Category: </span>{category || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
