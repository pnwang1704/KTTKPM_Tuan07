import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { CreditCard, ChevronLeft } from 'lucide-react';
import SeatGrid from '../components/SeatGrid';
import { bookingService } from '../services/bookingService';
import { initiateBooking, bookingCreated } from '../store/slices/bookingSlice';

const TICKET_PRICE = 15;

export default function Booking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedMovie, selectedSeats, status } = useSelector((state) => state.booking);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!selectedMovie) {
      navigate('/movies');
    }
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [selectedMovie, isAuthenticated, navigate]);

  const handleBook = async () => {
    if (selectedSeats.length === 0) return;

    dispatch(initiateBooking());
    try {
      const result = await bookingService.createBooking({
        userId: user ? user.id : 1,
        movieId: selectedMovie.id,
        seatNumber: selectedSeats.join(', ')
      });
      dispatch(bookingCreated(result.bookingId));
      navigate('/result');
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedMovie) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Seat Selection */}
        <div className="flex-1 glass-panel p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-12 text-center">Select Your Seats</h2>
          <SeatGrid />
        </div>

        {/* Summary Sidebar */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="glass-panel p-6 rounded-2xl sticky top-24">
            <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
              <img src={selectedMovie.poster} alt="" className="w-20 rounded shadow-lg" />
              <div>
                <h3 className="font-bold text-lg mb-1">{selectedMovie.title}</h3>
                <p className="text-sm text-gray-400">English • 2D</p>
                <p className="text-sm text-gray-400 mt-1">Today, 19:30</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Selected Seats</span>
                <span className="font-medium text-accent-gold">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Price per Ticket</span>
                <span className="font-medium">${TICKET_PRICE}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-gray-400 uppercase tracking-wider text-sm">Total Amount</span>
                <span className="text-3xl font-bold text-accent-blue glow-text">
                  ${selectedSeats.length * TICKET_PRICE}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={selectedSeats.length > 0 ? { scale: 1.02 } : {}}
              whileTap={selectedSeats.length > 0 ? { scale: 0.98 } : {}}
              onClick={handleBook}
              disabled={selectedSeats.length === 0 || status === 'PENDING'}
              className="w-full py-4 bg-accent-gold text-primary font-bold rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex justify-center items-center gap-2 hover:bg-yellow-500 transition-colors"
            >
              {status === 'PENDING' ? (
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  PROCEED TO PAYMENT
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
