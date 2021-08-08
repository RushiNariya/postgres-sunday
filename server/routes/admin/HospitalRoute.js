const express = require('express');
// const userController = require('../controllers/users/registerUser');
const { addHospital } = require('../../controllers/hospitals/addHospital');
const getAllHospitals = require('../../controllers/hospitals/getAllHospitals');
const getHospitalById = require('../../controllers/hospitals/getHospitalById');
const { editHospital } = require('../../controllers/hospitals/editHospital');
const {
    deleteHospital,
} = require('../../controllers/hospitals/deleteHospital');

const { ensureToken } = require('../../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
router.get('/', ensureToken(['hospital:get']), getAllHospitals);
router.post('/add', ensureToken(['hospital:post']), addHospital);
router.delete('/:id', ensureToken(['hospital:delete']), deleteHospital);
router.put('/:id', ensureToken(['hospital:put']), editHospital);
router.get('/:id', ensureToken(['hospital:get']), getHospitalById);

module.exports = router;
