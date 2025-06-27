require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Działa' });
});

app.listen(port, () => {
  console.log(`Backend działa na porcie ${port}`);
});
