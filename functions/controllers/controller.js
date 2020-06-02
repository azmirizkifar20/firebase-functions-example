const admin = require('firebase-admin');
const { user, karya } = require('../model/schema');
const { responseData, responseMessage } = require('../utils/response');

admin.initializeApp({
    apiKey: '[YOUR_API_KEY]',
    authDomain: '[YOUR_AUTH_DOMAIN]',
    projectId: '[YOUR_PROJECT_ID]',
});
const firestore = admin.firestore();
const dbUser = firestore.collection('user');

// create data user
exports.createUser = (req, res, next) => {
    dbUser
        .add(user(req.body))
        .then((docRef) => {
            return responseMessage(res, 201, `Data user berhasil dibuat dengan ID = ${docRef.id}`);
        })
        .catch((e) => {
            return res.status(500).json({ success: false, message: e.message });
        });
};

// update data user (belum validasi uid)
exports.updateUser = (req, res, next) => {
    // get data input
    var data = {
        uid: req.params.uid,
        name: req.body.name,
        nim: req.body.nim,
        class: req.body.class,
        position: req.body.position,
        face: req.body.face,
    };

    dbUser
        .doc(req.params.uid)
        .update(data)
        .then(() => {
            return responseMessage(res, 200, 'Berhasil update user!');
        })
        .catch((e) => {
            return res.status(500).json({ success: false, message: e.message });
        });
};

// hapus data user (belum validasi uid)
exports.deleteUser = (req, res, next) => {
    dbUser
        .doc(req.params.uid)
        .delete()
        .then(() => {
            return responseMessage(res, 200, 'Berhasil hapus user!');
        })
        .catch((e) => {
            return res.status(500).json({ success: false, message: e.message });
        });
};

// get data user
exports.getUser = (req, res, next) => {
    dbUser
        .get()
        .then((qs) => {
            var data = [];

            qs.forEach((doc) => {
                data.push({
                    uid: doc.id,
                    name: doc.data().name,
                    nim: doc.data().nim,
                    class: doc.data().class,
                    position: doc.data().position,
                    face: doc.data().face,
                });
            });
            return responseData(res, 200, data);
        })
        .catch((e) => {
            return res.status(500).json({ success: false, message: e.message });
        });
};
