const express = require('express');
// const userController = require('../controllers/users/registerUser');
const { addDoctor } = require('../../controllers/admin/doctor/addDoctor');
const { editDoctor } = require('../../controllers/admin/doctor/editDoctor');
const {
  getDoctorById,
} = require('../../controllers/admin/doctor/getDoctorById');
const {
  getAllDoctors,
} = require('../../controllers/admin/doctor/getAllDoctors');
const {
  getDoctorByHospitalId,
} = require('../../controllers/admin/doctor/getDoctorByHospitalId');
// const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
///-------------------
router.get('/', getAllDoctors);
router.post('/add', addDoctor);
// router.delete('/:id', deleteDoctor);
router.put('/:id', editDoctor);
router.get('/:id', getDoctorById);
router.get('/hospital/:id', getDoctorByHospitalId);
//---------------
module.exports = router;
