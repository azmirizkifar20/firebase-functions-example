const functions = require('firebase-functions');

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const admin = require('firebase-admin');

admin.initializeApp({
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
});
const firestore = admin.firestore();

/* Express with CORS & automatic trailing '/' solution */
const app = express();
app.use(cors({ origin: true }));

// set body-parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

// get all countries
app.get('/countries', (req, res) => {
    firestore
        .collection('countries')
        .get()
        .then((qs) => {
            var data = [];

            qs.forEach((doc) => {
                data.push({
                    id: doc.id,
                    namaNegara: doc.data().namaNegara,
                    ibuKota: doc.data().ibuKota,
                    jumlahPenduduk: doc.data().jumlahPenduduk,
                    mataUang: doc.data().mataUang,
                    gambar: doc.data().gambar,
                });
            });
            return res.status(200).json(data);
        })
        .catch((e) => {
            return res.status(500).json({ success: false, message: e.message });
        });
});

// add data negara
app.post('/countries', (req, res) => {
    var { namaNegara, ibuKota, jumlahPenduduk, mataUang, gambar } = req.body;
    firestore
        .collection('countries')
        .add({ namaNegara, ibuKota, jumlahPenduduk, mataUang, gambar })
        .then((docRef) => {
            return res
                .status(200)
                .json({ success: true, message: `Data countries berhasil dibuat dengan ID = ${docRef.id}` });
        })
        .catch((e) => {
            return res.status(500).json({ success: false, message: e.message });
        });
});

app.get('*', (request, response) => {
    response.send("Hello from Express on Firebase with CORS! No trailing '/' required!");
});

// not as clean, but a better endpoint to consume
const api = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`;
    }
    return app(request, response);
});

module.exports = { api };
