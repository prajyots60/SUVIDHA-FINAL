/* eslint-disable react/prop-types */
// Modal.jsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css'; // Ensure clock styles are imported
import { format } from 'date-fns';

const Modal = ({
  isOpen,
  closeModal,
  selectedDate,
  setSelectedDate,
  handleBookingConfirmation,
}) => {
  const [selectedTime, setSelectedTime] = useState(null); // Manage time state
  const [userName, setUserName] = useState(''); // Manage user name state
  const [isSubmitting, setIsSubmitting] = useState(false); // Manage loading state
  const today = new Date(); // Get today's date to restrict past dates

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null; // Don't render anything if the modal is closed

  // Function to handle booking confirmation
  const onConfirmBooking = async () => {
    if (!userName.trim() || !selectedDate || !selectedTime) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true); // Start loading

    // Format date and time (optional)
    const formattedDate = format(selectedDate, 'yyyy/MM/dd');
    const formattedTime = selectedTime; // Adjust formatting as needed

    try {
      await handleBookingConfirmation(userName, formattedDate, formattedTime);
      // Optionally, reset form fields after successful booking
      setUserName('');
      setSelectedDate(null);
      setSelectedTime(null);
      closeModal();
    } catch (error) {
      console.error('Booking confirmation failed:', error);
      alert('There was an error confirming your booking. Please try again.');
    } finally {
      setIsSubmitting(false); // End loading
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="bg-purple-100 rounded-lg shadow-lg p-8 relative w-full max-w-lg"> {/* Light purple background */}
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close Modal"
        >
          <X size={24} />
        </button>

        {/* Modal Title */}
        <h2
          id="modal-title"
          className="text-3xl font-semibold text-purple-600 mb-6" // Title color
        >
          Book Your Service
        </h2>

        {/* DatePicker for date selection */}
        <div className="mb-4">
          <label
            htmlFor="date-picker"
            className="block text-lg font-medium mb-2 text-gray-700"
          >
            Select Date:
          </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            className="border border-gray-300 rounded-lg p-2 w-full focus:border-purple-500 focus:outline-none text-black"
            placeholderText="Choose a date"
            minDate={today} // Restrict to today or future dates
          />
        </div>

        {/* TimePicker for time selection */}
        <div className="mb-4">
          <label
            htmlFor="time-picker"
            className="block text-lg font-medium mb-2 text-gray-700"
          >
            Preferred Time Slot:
          </label>
          <TimePicker
            id="time-picker"
            onChange={setSelectedTime}
            value={selectedTime}
            disableClock={false} // Show the clock for selecting time
            clearIcon={null}
            format="hh:mm a"
            className="border border-gray-300 rounded-lg p-2 w-full focus:border-purple-500 focus:outline-none text-black"
          />
        </div>

        {/* Input field for user's name */}
        <div className="mb-4">
          <label
            htmlFor="user-name"
            className="block text-lg font-medium mb-2 text-gray-700"
          >
            Your Name:
          </label>
          <input
            id="user-name"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // Update user name on change
            className="border border-gray-300 rounded-lg p-2 w-full focus:border-purple-500 focus:outline-none text-black"
          />
        </div>

        {/* Confirmation buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onConfirmBooking}
            disabled={isSubmitting}
            className={`bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
          <button
            onClick={closeModal}
            disabled={isSubmitting}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-all duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
