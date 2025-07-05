import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DonationForm() {
  const [form, setForm] = useState({ name: '', message: '', amount: '' });
  const navigate = useNavigate();
  const { streamerId } = useParams();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/donation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, streamerId })
    });
    navigate('/thank-you');
  };

  return (
    <div className="form-page">
      <h1>Donate to {streamerId}</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" onChange={handleChange} required />
        <input name="message" placeholder="Your Message" onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
}

export default DonationForm;