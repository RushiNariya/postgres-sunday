const express = require('express');
// const userController = require('../../controllers/users/registerUser');
const {
  addPatient,
} = require('../../controllers/hospitalAdmin/patient/addPatient');
const {
  getAllPatients,
} = require('../../controllers/hospitalAdmin/patient/getAllPatient');
const {
  getPatientById,
} = require('../../controllers/hospitalAdmin/patient/getPatientById');
// const loginUser = require('../../controllers/users/loginUser');
// const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
//---------------
router.get('/', getAllPatients);
router.post('/add', addPatient);
// router.delete('/:id', deletePatient);
// router.put('/:id', editPatient);
router.get('/:id', getPatientById);
//---------------

module.exports = router;
