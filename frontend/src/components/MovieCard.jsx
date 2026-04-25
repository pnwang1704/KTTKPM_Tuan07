import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <motion.div 
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="group relative rounded-xl overflow-hidden cursor-pointer"
      >
        <div className="aspect-[2/3] w-full">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent-gold" fill="currentColor" />
              {movie.rating}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {movie.duration}
            </span>
          </div>
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 border-2 border-accent-gold/0 group-hover:border-accent-gold/50 rounded-xl transition-colors duration-300 group-hover:glow-box pointer-events-none" />
      </motion.div>
    </Link>
  );
}
