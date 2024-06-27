const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// CORS middleware'ini ekleyin
app.use(cors({
  origin: 'http://localhost:57363'  // Frontend uygulamanızın çalıştığı portu buraya yazın
}));

// Body parser middleware'ini ekleyin
app.use(bodyParser.json());

// Mock e-posta gönderim endpoint'i
app.post('/api/send-email', (req, res) => {
  const { email, favoriteProperties } = req.body;

  console.log('Email:', email);
  console.log('Favorite Properties:', favoriteProperties);

  // Mock response
  res.status(200).send('E-posta başarıyla gönderildi');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
