require('dotenv').config();
const express = require('express');
const app = express();

require('./api/models/db');

const apiRouter = require('./api/routes/api');
app.use('/api/v1/', apiRouter);

app.get('/teste', (req, res) => {
    res.send({ hi: 'there' });
});

// app.get('/', (req, res) => {
//     res.redirect('/app/');
// });





if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static(path.resolve(__dirname, '../app/client/build')));

    // Express will serve up the index.html file
    // if it doesn't recognize the route

    app.get('/app/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
