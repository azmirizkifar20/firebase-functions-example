const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const Router = require('./routes/route');
const express = require('express');
const cors = require('cors');
const app = express();

// use cors
app.use(cors({ origin: true }));

// set body-parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

// use router
app.use('/countries', Router);

// not as clean, but a better endpoint to consume
const api = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`;
    }
    return app(request, response);
});

module.exports = { api };
