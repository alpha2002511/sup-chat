import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DonationForm from './components/DonationForm';
import Overlay from './components/Overlay';
import ThankYou from './components/ThakYou';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/:streamerId" element={<DonationForm />} />
        <Route path="/:streamerId/overlay" element={<Overlay />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
