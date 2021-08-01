const express = require('express');
// const userController = require('../controllers/users/registerUser');
const { addHospital } = require('../../controllers/admin/hospital/addHospital');
const getAllHospitals = require('../../controllers/admin/hospital/getAllHospitals');
const getHospitalById = require('../../controllers/admin/hospital/getHospitalById');
const {
  editHospital,
} = require('../../controllers/admin/hospital/editHospital');
const {
  deleteHospital,
} = require('../../controllers/admin/hospital/deleteHospital');

// const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
router.get('/', getAllHospitals);
router.post('/add', addHospital);
router.delete('/:id', deleteHospital);
router.put('/:id', editHospital);
router.get('/:id', getHospitalById);

module.exports = router;
