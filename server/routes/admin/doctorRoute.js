const express = require('express');
// const userController = require('../controllers/users/registerUser');
const { addDoctor } = require('../../controllers/doctor/addDoctor');
const { editDoctor } = require('../../controllers/doctor/editDoctor');
const { getDoctorById } = require('../../controllers/doctor/getDoctorById');
const { getAllDoctors } = require('../../controllers/doctor/getAllDoctors');
const { deleteDoctor } = require('../../controllers/doctor/deleteDoctor');
const {
    getDoctorByHospitalId,
} = require('../../controllers/doctor/getDoctorByHospitalId');
const { ensureToken } = require('../../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
///-------------------
router.get('/', ensureToken(['doctor:get']), getAllDoctors);
router.post('/add', ensureToken(['doctor:post']), addDoctor);
router.put('/:id', ensureToken(['doctor:put']), editDoctor);
router.get('/:id', ensureToken(['doctor:get']), getDoctorById);
router.delete('/:id', ensureToken(['doctor:delete']), deleteDoctor);
router.get('/hospital/:id', ensureToken(['doctor:get']), getDoctorByHospitalId);
//---------------
module.exports = router;
