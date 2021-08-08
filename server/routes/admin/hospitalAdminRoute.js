const express = require('express');

// const userController = require('../controllers/users/registerUser');
// const loginUser = require('../controllers/users/loginUser');
const { ensureToken } = require('../../utils/jwtUtils');
const {
    addHospitalAdmin,
} = require('../../controllers/hospitalAdmin/addHospitalAdmin');
const {
    editHospitalAdmin,
} = require('../../controllers/hospitalAdmin/editHospitalAdmin');
const {
    getAllHospitalAdmins,
} = require('../../controllers/hospitalAdmin/getAllHospitalAdmins');

const router = express.Router();

// router.get('/category', getAllCategory);
router.get('/', ensureToken(['hadmin:get']), getAllHospitalAdmins);
//---------------
router.post('/add', ensureToken(['hadmin:post']), addHospitalAdmin);
router.put('/edit', ensureToken(['hadmin:put']), editHospitalAdmin);
//---------------
// router.delete('/:id', deleteHospitalAdmin);
// router.put('/:id', editHospitalAdmin);
// router.get('/:id', getHospitalAdminById);

module.exports = router;
