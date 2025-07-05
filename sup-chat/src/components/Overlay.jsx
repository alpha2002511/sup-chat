import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Overlay() {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState(null);
  const { streamerId } = useParams();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('http://localhost:5000/overlay-feed');
        const data = await res.json();
        
        // Check if there's a new donation
        if (data.length > 0 && data.length > donations.length) {
          const latest = data[data.length - 1];
          setNewDonation(latest);
          
          // Text-to-speech for new donation
          const speech = new SpeechSynthesisUtterance(`${latest.name} says: ${latest.message}`);
          speech.rate = 0.9;
          speech.pitch = 1.1;
          window.speechSynthesis.speak(speech);
          
          // Clear new donation after animation
          setTimeout(() => setNewDonation(null), 5000);
        }
        
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    const interval = setInterval(fetchDonations, 3000);
    return () => clearInterval(interval);
  }, [donations.length]);

  return (
    <div className="fixed top-0 right-0 w-96 h-screen p-4 pointer-events-none z-50">
      {/* New Donation Animation */}
      {newDonation && (
        <div className="animate-slide-in mb-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 shadow-lg border border-indigo-400/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="font-bold text-white text-lg">{newDonation.name}</span>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                <span className="text-white font-bold">₹{newDonation.amount}</span>
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">{newDonation.message}</p>
          </div>
        </div>
      )}

      {/* Recent Donations List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {donations.slice(-5).reverse().map((donation, index) => (
          <div
            key={`${donation.name}-${donation.amount}-${index}`}
            className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-700/50 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {donation.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-semibold text-white text-sm">{donation.name}</span>
              </div>
              <div className="bg-amber-500/20 border border-amber-500/30 px-2 py-1 rounded-full">
                <span className="text-amber-300 font-bold text-sm">₹{donation.amount}</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{donation.message}</p>
          </div>
        ))}
      </div>

      {/* Streamer Info */}
      <div className="absolute bottom-4 right-4">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{streamerId}</p>
              <p className="text-slate-400 text-xs">SuperChat Tool</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center space-x-2 bg-red-600/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-white font-semibold text-sm">LIVE</span>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
