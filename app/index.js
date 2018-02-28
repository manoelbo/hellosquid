require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

require('./api/models/db');

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, '../app/client/build')));

const apiRouter = require('./api/routes/api');
app.use('/api/v1/', apiRouter);

app.get('*/teste', (req, res) => {
    res.send({ hi: 'there' });
});

// app.get('/', (req, res) => {
//     res.redirect('/app/');
// });

//
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT);
