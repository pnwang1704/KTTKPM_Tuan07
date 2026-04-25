import { useDispatch, useSelector } from 'react-redux';
import { toggleSeat } from '../store/slices/bookingSlice';
import { motion } from 'framer-motion';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 8;
// Mock occupied seats
const OCCUPIED_SEATS = ['C4', 'C5', 'D4', 'D5', 'E1', 'E2', 'F8'];

export default function SeatGrid() {
  const dispatch = useDispatch();
  const { selectedSeats } = useSelector((state) => state.booking);

  const handleSeatClick = (seatId) => {
    if (!OCCUPIED_SEATS.includes(seatId)) {
      dispatch(toggleSeat(seatId));
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Screen */}
      <div className="w-full max-w-2xl mb-12 relative">
        <div className="h-2 w-full bg-accent-blue/30 rounded-[100%] shadow-[0_0_20px_#00d2ff]" />
        <div className="h-12 w-full bg-gradient-to-b from-accent-blue/10 to-transparent" />
        <p className="text-center text-sm text-accent-blue/60 mt-2 tracking-widest uppercase">Screen</p>
      </div>

      <div className="flex flex-col gap-4">
        {ROWS.map((row) => (
          <div key={row} className="flex items-center gap-4">
            <span className="w-6 text-center text-gray-500 font-medium">{row}</span>
            <div className="flex gap-2 sm:gap-3">
              {Array.from({ length: SEATS_PER_ROW }).map((_, i) => {
                const seatId = `${row}${i + 1}`;
                const isOccupied = OCCUPIED_SEATS.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                let seatClass = "w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg rounded-b-sm cursor-pointer transition-all duration-300 ";
                
                if (isOccupied) {
                  seatClass += "bg-gray-800 cursor-not-allowed border border-gray-700";
                } else if (isSelected) {
                  seatClass += "bg-accent-gold shadow-[0_0_10px_#d4af37] border-accent-gold border";
                } else {
                  seatClass += "bg-white/10 hover:bg-white/20 border border-white/20 hover:border-accent-blue/50";
                }

                return (
                  <motion.button
                    key={seatId}
                    whileHover={!isOccupied ? { scale: 1.1 } : {}}
                    whileTap={!isOccupied ? { scale: 0.9 } : {}}
                    className={seatClass}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={isOccupied}
                    aria-label={`Seat ${seatId}`}
                  />
                );
              })}
            </div>
            <span className="w-6 text-center text-gray-500 font-medium">{row}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/10 border border-white/20 rounded-t-sm" /> Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent-gold shadow-[0_0_5px_#d4af37] rounded-t-sm" /> Selected
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800 border border-gray-700 rounded-t-sm" /> Occupied
        </div>
      </div>
    </div>
  );
}
