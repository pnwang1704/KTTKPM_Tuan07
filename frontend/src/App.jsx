import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Booking from './pages/Booking';
import Result from './pages/Result';
import EventLogPanel from './components/EventLogPanel';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #333',
          }
        }}/>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
        <EventLogPanel />
      </div>
    </Router>
  );
}

export default App;
