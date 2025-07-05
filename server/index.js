const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let donations = [];

app.post('/donation', (req, res) => {
  const donation = req.body;
  donations.push(donation);
  console.log('New donation:', donation);
  res.status(200).json({ message: 'Donation received!' });
});

app.get('/overlay-feed', (req, res) => {
  res.json(donations.slice(-5));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));