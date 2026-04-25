import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Film, User, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') return null;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Film className="w-8 h-8 text-accent-gold group-hover:glow-text transition-all" />
          <span className="text-2xl font-bold tracking-widest uppercase glow-text">CineVerse</span>
        </Link>
        
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <button 
                onClick={() => dispatch(logout())}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-5 py-2 bg-accent-gold/10 text-accent-gold border border-accent-gold/50 rounded hover:bg-accent-gold hover:text-primary transition-all font-semibold tracking-wide"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
