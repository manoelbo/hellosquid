require('dotenv').config()
const express = require('express');
const app = express();

require('./api/models/db');

const apiRouter = require('./api/routes/api');
app.use('/api/v1/', apiRouter);

app.get('/teste', (req, res) => {
    res.send({ hi: 'there' });
});

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app', 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT);
