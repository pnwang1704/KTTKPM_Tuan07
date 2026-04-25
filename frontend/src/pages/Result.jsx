import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { bookingService } from '../services/bookingService';
import { paymentSuccess, bookingFailed, resetBookingState } from '../store/slices/bookingSlice';
import { CinematicLoader } from '../components/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function Result() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentBookingId, status, error } = useSelector((state) => state.booking);

  useEffect(() => {
    if (!currentBookingId && status === 'IDLE') {
      navigate('/movies');
      return;
    }

    let isMounted = true;

    const pollStatus = async () => {
      try {
        const result = await bookingService.pollBookingStatus(currentBookingId);
        if (isMounted) {
          if (result.status === 'PAYMENT_COMPLETED') {
            dispatch(paymentSuccess());
            toast.success('Booking Confirmed!', { icon: '🍿' });
          } else {
            dispatch(bookingFailed(result.error));
            toast.error('Booking Failed');
          }
        }
      } catch (err) {
        if (isMounted) {
          dispatch(bookingFailed('Network error during polling'));
        }
      }
    };

    if (status === 'PENDING') {
      pollStatus();
    }

    return () => { isMounted = false; };
  }, [currentBookingId, status, dispatch, navigate]);

  const handleRetry = () => {
    navigate(-1); // Go back to booking page
  };

  const handleGoHome = () => {
    dispatch(resetBookingState());
    navigate('/movies');
  };

  if (status === 'PENDING') {
    return <CinematicLoader />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow based on status */}
      <div className={`absolute inset-0 opacity-20 blur-[100px] pointer-events-none transition-colors duration-1000 ${
        status === 'PAYMENT_COMPLETED' ? 'bg-green-500' : 'bg-red-500'
      }`} />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="glass-panel p-10 rounded-2xl max-w-md w-full text-center relative z-10"
      >
        {status === 'PAYMENT_COMPLETED' ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Booking Successful!</h2>
            <p className="text-gray-400 mb-6">
              Your tickets for <span className="text-white font-medium">the movie</span> have been confirmed.
              <br/>Booking ID: <span className="text-accent-blue font-mono">{currentBookingId}</span>
            </p>
            <button 
              onClick={handleGoHome}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
            >
              Back to Home
            </button>
          </>
        ) : (
          <motion.div
            animate={{ x: [-10, 10, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <XCircle className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Booking Failed</h2>
            <p className="text-gray-400 mb-8">{error || 'Something went wrong during payment.'}</p>
            
            <div className="flex gap-4">
              <button 
                onClick={handleGoHome}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleRetry}
                className="flex-1 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded border border-red-500/50 flex justify-center items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Retry
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
