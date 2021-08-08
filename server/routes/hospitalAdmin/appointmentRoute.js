const express = require('express');
// const userController = require('../controllers/users/registerUser');
const {
    addAppointment,
} = require('../../controllers/appointment/addAppointment');
// const loginUser = require('../controllers/users/loginUser');
const { ensureToken } = require('../../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
// router.get('/', getAppointments);
//---------------
router.post('/add', ensureToken(['appointment:post']), addAppointment);
//---------------
// router.delete('/:id', deleteAppointment);
// router.put('/:id', editAppointment);
// router.get('/:id', getAppointmentById);

module.exports = router;
