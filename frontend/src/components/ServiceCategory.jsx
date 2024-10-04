import { useNavigate } from 'react-router-dom';
import { FaBroom, FaWrench, FaPaintRoller, FaTruck, FaShower, FaBolt } from 'react-icons/fa';  // Example icons from react-icons

const services = [
  { icon: <FaBroom size={40} />, label: 'Cleaning', path: '/cleaning' },
  { icon: <FaWrench size={40} />, label: 'Repair', path: '/repair' },
  { icon: <FaPaintRoller size={40} />, label: 'Painting', path: '/painting' },
  { icon: <FaTruck size={40} />, label: 'Shifting', path: '/shifting' },
  { icon: <FaShower size={40} />, label: 'Plumbing', path: '/plumbing' },
  { icon: <FaBolt size={40} />, label: 'Electric', path: '/electric' },
];

const ServiceCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);  // Navigate to the respective service page
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 md:px-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 text-center rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center"
            onClick={() => handleCardClick(service.path)}
          >
            <div className="text-purple-600 mb-3">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{service.label}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;