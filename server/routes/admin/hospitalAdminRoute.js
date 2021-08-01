const express = require('express');
// const userController = require('../controllers/users/registerUser');
// const loginUser = require('../controllers/users/loginUser');
// const { ensureToken } = require('../utils/jwtUtils');
const {
  addHospitalAdmin,
} = require('../../controllers/admin/HospitalAdmin/addHospitalAdmin');

const router = express.Router();

// router.get('/category', getAllCategory);
// router.get('/', getAllHospitalAdmins);
//---------------
router.post('/add', addHospitalAdmin);
//---------------
// router.delete('/:id', deleteHospitalAdmin);
// router.put('/:id', editHospitalAdmin);
// router.get('/:id', getHospitalAdminById);

module.exports = router;
