const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// localhost:8080/
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'GET - root',
        metadata: {
            hostname: req.hostname,
            method: req.method,
        },
    });
});

app.use('/contacts', require('./routes/contactRouter'));
app.use('/v1/contacts', require('./routes/contactRouter'));

module.exports = app;
