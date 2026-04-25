import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Ticket } from 'lucide-react';
import { movieService } from '../services/movieService';
import { selectMovie } from '../store/slices/bookingSlice';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await movieService.getMovieById(id);
        setMovie(data);
        dispatch(selectMovie(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, dispatch]);

  if (loading) return <div className="min-h-screen bg-primary"></div>;
  if (!movie) return <div className="text-center mt-20">Movie not found</div>;

  return (
    <div className="relative min-h-screen -mt-20 pt-20">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={movie.hero} 
          alt={movie.title} 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Poster */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-sm shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 glow-box"
        >
          <img src={movie.poster} alt={movie.title} className="w-full h-auto" />
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-medium tracking-wider mb-4">
            {movie.genre}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">{movie.title}</h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-300 mb-8">
            <span className="flex items-center gap-2 text-lg">
              <Star className="w-6 h-6 text-accent-gold" fill="currentColor" />
              <span className="text-white font-bold">{movie.rating}</span>/10
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" /> {movie.duration}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" /> 2024
            </span>
          </div>

          <p className="text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed">
            {movie.description}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/booking/${movie.id}`)}
            className="px-8 py-4 bg-accent-gold text-primary font-bold text-lg rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center md:justify-start gap-3 hover:bg-yellow-500 transition-colors mx-auto md:mx-0"
          >
            <Ticket className="w-6 h-6" />
            BOOK TICKETS
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
