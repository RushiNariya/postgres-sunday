const express = require('express');
// const userController = require('../controllers/users/registerUser');
// const loginUser = require('../controllers/users/loginUser');
const { ensureToken } = require('../../utils/jwtUtils');
// const {
//     getAllAppointmentsByPatient,
// } = require('../../controllers/patient/appointment/getAllAppointmentsByPatient');
const {
    getAllAppointmentsByDoctor,
} = require('../../controllers/appointment/getAllAppointmentsByDoctor');

const router = express.Router();

// router.get('/category', getAllCategory);
//---------------
// router.get('/',ensureToken(['appointment:get']), getAllAppointmentsByPatient);
router.get(
    '/appointments',
    ensureToken(['appointment:get']),
    getAllAppointmentsByDoctor
);

// router.post('/add', addAppointment);
// router.delete('/:id', deleteAppointment);
// router.get('/:id', getAppointmentById);
//---------------
// router.put('/:id', editAppointment);

module.exports = router;
