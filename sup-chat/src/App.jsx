import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DonationForm from './components/DonationForm';
import Overlay from './components/Overlay';
import ThankYou from './components/ThakYou';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Demo from './pages/Demo';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/:streamerId" element={<DonationForm />} />
        <Route path="/:streamerId/overlay" element={<Overlay />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
