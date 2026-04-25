import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Film } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { authService } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const user = await authService.login({ email, password });
      dispatch(loginSuccess(user));
      navigate('/movies');
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-8 glass-panel rounded-2xl relative z-10 mx-4"
      >
        <div className="flex justify-center mb-8">
          <Film className="w-12 h-12 text-accent-gold glow-text" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 glow-text">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-8">Enter the CineVerse</p>

        {error && (
          <div className="bg-accent-red/20 border border-accent-red/50 text-accent-red px-4 py-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-accent-blue transition-colors" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
              placeholder="Email address"
              required
            />
          </div>
          
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-accent-blue transition-colors" />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
              placeholder="Password"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent-gold text-primary font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:opacity-70 flex justify-center items-center h-[52px]"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              'SIGN IN'
            )}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="text-accent-blue hover:text-blue-400">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
