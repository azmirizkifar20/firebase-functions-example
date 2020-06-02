const { createUser, updateUser, deleteUser, getUser } = require('../controllers/controller');
const express = require('express');
const router = express.Router();

router.route('/').post(createUser).get(getUser);
router.route('/:uid').put(updateUser).delete(deleteUser);

module.exports = router;
