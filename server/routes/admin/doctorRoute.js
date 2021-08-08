const express = require('express');
// const userController = require('../controllers/users/registerUser');
const { addDoctor } = require('../../controllers/doctor/addDoctor');
const { editDoctor } = require('../../controllers/doctor/editDoctor');
const { getDoctorById } = require('../../controllers/doctor/getDoctorById');
const { getAllDoctors } = require('../../controllers/doctor/getAllDoctors');
const {
    getDoctorByHospitalId,
} = require('../../controllers/doctor/getDoctorByHospitalId');
const { ensureToken } = require('../../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
///-------------------
router.get('/', ensureToken(['doctor:get']), getAllDoctors);
router.post('/add', ensureToken(['doctor:post']), addDoctor);
// router.delete('/:id', deleteDoctor);
router.put('/:id', ensureToken(['doctor:put']), editDoctor);
router.get('/:id', ensureToken(['doctor:get']), getDoctorById);
router.get('/hospital/:id', ensureToken(['doctor:get']), getDoctorByHospitalId);
//---------------
module.exports = router;
