import { movieClient } from './apiClient';

const PLACEHOLDER_POSTER = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=500';
const PLACEHOLDER_HERO = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1200';

export const movieService = {
  getMovies: async () => {
    const movies = await movieClient.get('/movies');
    return movies.map(m => ({
      ...m,
      poster: m.poster || PLACEHOLDER_POSTER,
      hero: m.hero || PLACEHOLDER_HERO,
      rating: m.rating || '8.5',
      duration: m.duration || '2h 15m',
      description: m.description || 'No description available for this cinematic masterpiece.'
    }));
  },
  
  getMovieById: async (id) => {
    const m = await movieClient.get(`/movies/${id}`);
    return {
      ...m,
      poster: m.poster || PLACEHOLDER_POSTER,
      hero: m.hero || PLACEHOLDER_HERO,
      rating: m.rating || '8.5',
      duration: m.duration || '2h 15m',
      description: m.description || 'No description available for this cinematic masterpiece.'
    };
  }
};
