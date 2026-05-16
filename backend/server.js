const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('PS5 Gaming Garage backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
