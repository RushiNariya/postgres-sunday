const express = require('express');
// const userController = require('../../controllers/users/registerUser');
const { addPatient } = require('../../controllers/patient/addPatient');
const { getAllPatients } = require('../../controllers/patient/getAllPatient');
const { getPatientById } = require('../../controllers/patient/getPatientById');
// const loginUser = require('../../controllers/users/loginUser');
const { ensureToken } = require('../../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
//---------------
router.get('/', ensureToken(['pat:get']), getAllPatients);
router.post('/add', addPatient);
// router.delete('/:id', deletePatient);
// router.put('/:id', editPatient);
router.get('/:id', ensureToken(['pat:get']), getPatientById);
//---------------

module.exports = router;
