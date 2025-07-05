import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    todayDonations: 0,
    todayAmount: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/overlay-feed');
        const data = await response.json();
        setDonations(data);

        // Calculate stats
        const totalAmount = data.reduce((sum, donation) => sum + parseInt(donation.amount), 0);
        const today = new Date().toDateString();
        const todayDonations = data.filter(donation => 
          new Date(donation.timestamp || Date.now()).toDateString() === today
        );
        const todayAmount = todayDonations.reduce((sum, donation) => sum + parseInt(donation.amount), 0);

        setStats({
          totalDonations: data.length,
          totalAmount,
          todayDonations: todayDonations.length,
          todayAmount
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
              <span className="text-xl font-bold text-gradient">SuperChat Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/home" className="btn btn-outline">Back to Home</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Donations</p>
                <p className="text-2xl font-bold text-white">{stats.totalDonations}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-white">₹{stats.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Today's Donations</p>
                <p className="text-2xl font-bold text-white">{stats.todayDonations}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Today's Amount</p>
                <p className="text-2xl font-bold text-white">₹{stats.todayAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/demo" className="btn btn-primary w-full">
                View Overlay
              </Link>
              <button className="btn btn-outline w-full">
                Copy Donation Link
              </button>
              <button className="btn btn-outline w-full">
                Settings
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Stream Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Status:</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">Live</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Viewers:</span>
                <span className="text-white font-semibold">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Duration:</span>
                <span className="text-white font-semibold">2h 15m</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-2">
              {donations.slice(-3).reverse().map((donation, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-slate-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {donation.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{donation.name}</p>
                    <p className="text-slate-400 text-xs truncate">{donation.message}</p>
                  </div>
                  <span className="text-amber-400 font-bold text-sm">₹{donation.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Donations Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Donations</h3>
            <button className="btn btn-outline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Donor</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Message</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {donations.slice(-10).reverse().map((donation, index) => (
                  <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {donation.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white font-medium">{donation.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-slate-300 max-w-xs truncate">{donation.message}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-amber-400 font-bold">₹{donation.amount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-400 text-sm">
                        {new Date(donation.timestamp || Date.now()).toLocaleTimeString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
