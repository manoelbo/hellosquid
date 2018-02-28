require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// MongoDB config
require('./api/models/db');

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, '../app/client/build')));

// API router
const apiRouter = require('./api/routes/api');
app.use('/api/v1/', apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

module.exports = app; // for testing
