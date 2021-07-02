require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const logger = require('./middleware/logger');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.static('public'));
app.use(cors());

// REMOVE THIS -just for making sure things work
app.get('/api/test', (req, res) => {
  const text = {text : 'The backend is working'};
  res.json(text);
});

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  logger(`Server running on port ${PORT}`);
});
