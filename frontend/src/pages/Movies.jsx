import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import { MovieCardSkeleton } from '../components/LoadingSkeleton';
import { movieService } from '../services/movieService';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex justify-between items-end"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2 glow-text">Now Showing</h1>
          <p className="text-gray-400">Experience the magic of cinema</p>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors">All</button>
          <button className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors">Action</button>
          <button className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors">Sci-Fi</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : movies.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
      </div>
    </div>
  );
}
