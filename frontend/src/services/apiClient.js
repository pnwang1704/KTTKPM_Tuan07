import axios from 'axios';
import toast from 'react-hot-toast';

export const AUTH_URL = 'http://172.16.40.124:8080';
export const MOVIE_URL = 'http://172.16.40.124:8080';
export const BOOKING_URL = 'http://172.16.40.124:8080';

// We create separate clients for each service port
export const authClient = axios.create({ baseURL: AUTH_URL });
export const movieClient = axios.create({ baseURL: MOVIE_URL });
export const bookingClient = axios.create({ baseURL: BOOKING_URL });

const setupInterceptors = (client) => {
  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.error('API Error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
  );
};

setupInterceptors(authClient);
setupInterceptors(movieClient);
setupInterceptors(bookingClient);

export default { authClient, movieClient, bookingClient };
