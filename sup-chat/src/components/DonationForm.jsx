import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DonationForm() {
  const [form, setForm] = useState({ name: '', message: '', amount: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { streamerId } = useParams();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, streamerId })
      });

      if (!response.ok) {
        throw new Error('Failed to submit donation');
      }

      navigate('/thank-you');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const presetAmounts = [100, 250, 500, 1000, 2500, 5000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Support <span className="text-gradient">{streamerId}</span>
          </h1>
          <p className="text-slate-300">
            Show your love with a donation and message
          </p>
        </div>

        {/* Donation Form */}
        <div className="card glass">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
                className="input"
                maxLength={50}
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write a message for the streamer..."
                value={form.message}
                onChange={handleChange}
                required
                className="input resize-none h-24"
                maxLength={200}
              />
              <div className="text-right text-xs text-slate-400 mt-1">
                {form.message.length}/200
              </div>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-3">
                Donation Amount (₹)
              </label>
              
              {/* Preset Amounts */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setForm({ ...form, amount: amount.toString() })}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      form.amount === amount.toString()
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                        : 'border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <input
                name="amount"
                type="number"
                placeholder="Or enter custom amount"
                value={form.amount}
                onChange={handleChange}
                required
                min="1"
                className="input"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn btn-primary text-lg py-4 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                `Donate ₹${form.amount || '0'}`
              )}
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-sm text-slate-400">
          <p>Your donation will be processed securely</p>
          <p className="mt-1">Thank you for supporting the stream!</p>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/home')}
            className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonationForm;