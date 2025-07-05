import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Demo() {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState(null);

  // Sample donations for demo
  const sampleDonations = [
    { name: 'Alex', message: 'Amazing stream! Keep it up!', amount: '500', timestamp: Date.now() - 30000 },
    { name: 'Sarah', message: 'Love your content!', amount: '1000', timestamp: Date.now() - 60000 },
    { name: 'Mike', message: 'You deserve this!', amount: '250', timestamp: Date.now() - 90000 },
    { name: 'Emma', message: 'Best streamer ever!', amount: '750', timestamp: Date.now() - 120000 },
  ];

  useEffect(() => {
    setDonations(sampleDonations);
    
    // Simulate new donations every 5 seconds
    const interval = setInterval(() => {
      const newDonors = ['John', 'Lisa', 'David', 'Anna', 'Tom', 'Maria'];
      const newMessages = [
        'Great stream!',
        'You\'re awesome!',
        'Keep streaming!',
        'Love your content!',
        'Amazing work!',
        'Best streamer!'
      ];
      
      const randomDonor = newDonors[Math.floor(Math.random() * newDonors.length)];
      const randomMessage = newMessages[Math.floor(Math.random() * newMessages.length)];
      const randomAmount = [100, 250, 500, 750, 1000, 1500][Math.floor(Math.random() * 6)];
      
      const newDonation = {
        name: randomDonor,
        message: randomMessage,
        amount: randomAmount.toString(),
        timestamp: Date.now()
      };
      
      setNewDonation(newDonation);
      setDonations(prev => [...prev, newDonation]);
      
      // Text-to-speech for new donation
      const speech = new SpeechSynthesisUtterance(`${randomDonor} says: ${randomMessage}`);
      speech.rate = 0.9;
      speech.pitch = 1.1;
      window.speechSynthesis.speak(speech);
      
      // Clear new donation after animation
      setTimeout(() => setNewDonation(null), 5000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="glass border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="text-xl font-bold text-gradient">SuperChat Demo</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/home" className="btn btn-outline">Back to Home</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">SuperChat</span> Demo
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            This is a live demo of how the SuperChat overlay works. 
            Watch as donations come in with text-to-speech and beautiful animations!
          </p>
        </div>

        {/* Demo Controls */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Demo Controls</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Auto-generate donations:</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Text-to-speech:</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Update interval:</span>
                <span className="text-white font-semibold">5 seconds</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">How to Use</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <p>• Watch the overlay on the right for live donations</p>
              <p>• Listen for text-to-speech announcements</p>
              <p>• See how the overlay integrates with your stream</p>
              <p>• Test the donation form below</p>
            </div>
          </div>
        </div>

        {/* Live Overlay Preview */}
        <div className="relative bg-slate-800 rounded-xl p-6 mb-12">
          <h3 className="text-xl font-semibold text-white mb-6">Live Overlay Preview</h3>
          <div className="relative h-96 bg-slate-900 rounded-lg overflow-hidden">
            {/* Simulated stream background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
            
            {/* Overlay positioned like in real stream */}
            <div className="absolute top-4 right-4 w-80 space-y-3">
              {/* New Donation Animation */}
              {newDonation && (
                <div className="animate-slide-in">
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

              {/* Recent Donations */}
              {donations.slice(-3).reverse().map((donation, index) => (
                <div
                  key={index}
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

            {/* Live Indicator */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-2 bg-red-600/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white font-semibold text-sm">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Test Donation Form */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6">Test Donation Form</h3>
          <div className="max-w-md mx-auto">
            <Link to="/demo-streamer" className="btn btn-primary w-full text-lg py-4">
              Try Donation Form
            </Link>
            <p className="text-center text-slate-400 text-sm mt-4">
              This will open the donation form in a new window
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo; 