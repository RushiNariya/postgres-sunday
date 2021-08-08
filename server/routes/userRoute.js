const express = require('express');
// const userController = require('../controllers/users/registerUser');
const { login } = require('../controllers/user/loginUser');
const { changePassword } = require('../controllers/user/changePassword');
const {
    applyForgotPassword,
} = require('../controllers/user/applyForgotPassword');
const { forgotPassword } = require('../controllers/user/forgotPassword');
const { ensureToken } = require('../utils/jwtUtils');
// const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

router.post('/login', login);

//---------------
// router.post('/forgotpassword');
router.post('/changepassword', ensureToken(), changePassword);
router.post('/applyforgotpassword', applyForgotPassword);
router.post('/forgotpassword', forgotPassword);
// router.post('/add', addPatient);
// router.put('/:id', editPatient);
// router.get('/:id', getPatientById);
//---------------
module.exports = router;
