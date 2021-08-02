const express = require('express');
// const userController = require('../controllers/users/registerUser');
const {login} = require('../controllers/user/loginUser');
// const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

router.post('/login', login);

//---------------
// router.post('/forgotpassword');
// router.post('/changepassword');
// router.post('/add', addPatient);
// router.put('/:id', editPatient);
// router.get('/:id', getPatientById);
//---------------
module.exports = router;
