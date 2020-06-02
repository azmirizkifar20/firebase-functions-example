const admin = require('firebase-admin');
const { countries } = require('../model/models');
admin.initializeApp({
    apiKey: '[YOUR_API_KEY]',
    authDomain: '[YOUR_AUTH_DOMAIN]',
    projectId: '[YOUR_PROJECT_ID]',
});
const firestore = admin.firestore();

// create data countries
exports.createCountries = (req, res, next) => {
    firestore
        .collection('countries')
        .add(countries(req.body))
        .then((docRef) => {
            return res
                .status(200)
                .json({ success: true, message: `Data countries berhasil dibuat dengan ID = ${docRef.id}` });
        })
        .catch((e) => {
            return res.status(500).json({ success: false, message: e.message });
        });
};

// get data countries
exports.getCountries = (req, res, next) => {
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
};
