import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Overlay() {
  const [donations, setDonations] = useState([]);
  const { streamerId } = useParams();

  useEffect(() => {
    const fetchDonations = async () => {
      const res = await fetch('http://localhost:5000/overlay-feed');
      const data = await res.json();
      setDonations(data);

      if (data.length > 0) {
        const last = data[data.length - 1];
        const speech = new SpeechSynthesisUtterance(`${last.name} says: ${last.message}`);
        window.speechSynthesis.speak(speech);
      }
    };
    const interval = setInterval(fetchDonations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overlay">
      {donations.map((d, index) => (
        <div key={index} className="donation">
          <strong>{d.name}</strong>: {d.message} - ₹{d.amount}
        </div>
      ))}
    </div>
  );
}

export default Overlay;
