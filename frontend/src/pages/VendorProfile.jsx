import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { getVendorById } from '../api'; 
import Modal from '../lib/Modal.jsx'; // Import the modal component
import { useUserStore } from '../stores/useUserStore.js'; // Import the Zustand store
import axiosInstance from '../lib/axios.js';

const VendorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const { user } = useUserStore(); // Access the user state from Zustand
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [selectedTime, setSelectedTime] = useState(null); // Define selectedTime state

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await getVendorById(id); 
                setVendor(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vendor data:", error);
                setError("Failed to load vendor profile.");
                setLoading(false);
            }
        };

        fetchVendorData();
    }, [id]);

    const handleBookService = () => {
        if (!user) { // Check if user is authenticated
            toast.error("Please log in to book a service."); // Notify user
            navigate('/login'); // Redirect to login page
        } else {
            setIsModalOpen(true); // Open modal when booking service
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close modal
    };

    const handleBookingConfirmation = async (userName, serviceDate, preferredTime) => {
        try {
            const response = await axiosInstance.post('/bookings', {
                userId: user._id,
                vendorId: id,
                name: userName,
                serviceDate: serviceDate,
                preferredTime: preferredTime,
            });

            console.log('Booking confirmed:', response.data);
            toast.success('Booking confirmed!');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to create booking:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to create booking');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner /> {/* Show the loading spinner */}
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-6 text-red-600">{error}</div>;
    }

    if (!vendor) {
        return <div className="text-center mt-6">Vendor not found</div>;
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center py-8">
            {/* Background Layer */}
            <div className='absolute inset-0'>
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.3)_0%,rgba(75,0,130,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
            </div>

            <div className="max-w-4xl w-full mx-auto bg-white shadow-xl rounded-lg p-8 z-10">
                <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Vendor Profile</h2>

                {/* Vendor Details (Image, Name, Occupation, etc.) */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <div className="md:w-1/2 flex flex-col items-center md:items-start mb-4 md:mb-0">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-600 mb-4">
                            <img
                                src={vendor.image}
                                alt="Vendor"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{vendor.name}</h2>
                        <p className="text-lg text-purple-600 font-medium mb-1">{vendor.occupation}</p>
                        <p className="text-sm text-gray-500">{vendor.email}</p>
                    </div>

                    <div className="md:w-1/2 text-center md:text-left md:pl-8">
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-purple-600">Location</h3>
                            <p className="text-lg text-gray-700">{vendor.location}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-purple-600">Category</h3>
                            <p className="text-lg text-gray-700">{vendor.category}</p>
                        </div>
                    </div>
                </div>

                {/* Vendor Address */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-2xl font-semibold text-purple-600 mb-3">Address</h3>
                    <p className="text-lg text-gray-700">{vendor.address}</p>
                </div>

                {/* Description Section */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-2xl font-semibold text-purple-600 mb-3">Description</h3>
                    <p className="text-lg text-gray-700">{vendor.description}</p>
                </div>

                {/* Gallery Section */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-2xl font-semibold text-purple-600 mb-3">Gallery</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {vendor.gallery && vendor.gallery.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={image}
                                    alt={`Gallery Image ${index + 1}`}
                                    className="object-cover w-full h-32 transition-transform duration-200 hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Book Service Button */}
                <div className="mt-6">
                    <button
                        onClick={handleBookService}
                        className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-200"
                    >
                        Book Service
                    </button>
                </div>

                {/* Booking Modal */}
                <Modal 
                    isOpen={isModalOpen} 
                    closeModal={closeModal} 
                    selectedDate={selectedDate} 
                    setSelectedDate={setSelectedDate}  
                    selectedTime={selectedTime} // Pass selectedTime to the modal
                    setSelectedTime={setSelectedTime} // Pass setSelectedTime to the modal
                    handleBookingConfirmation={handleBookingConfirmation} 
                />
            </div>
        </div>
    );
};

export default VendorProfile;
