const express = require('express');
// const userController = require('../controllers/users/registerUser');
const {
    getAllPendingQueries,
} = require('../../controllers/query/getAllPendingQueries');
const {
    getQueryByIdForhospitalAdmin,
} = require('../../controllers/query/getQueryByIdForhospitalAdmin');
const { answerQuery } = require('../../controllers/query/answerQuery');
// const {
//   getQueryById,
// } = require('../../controllers/patient/query/getQueryById');
// const loginUser = require('../controllers/users/loginUser');
const { ensureToken } = require('../../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);

//---------------
router.get('/', ensureToken(['query:get']), getAllPendingQueries);
router.get('/:id', ensureToken(['query:get']), getQueryByIdForhospitalAdmin);
router.put('/answered/:id', ensureToken(['query:put']), answerQuery);
//---------------

// router.delete('/:id', deleteQuery);

//---------------
// router.get('/forward', forwardQuery);
// router.get('/:id', getQueryById);
//---------------

module.exports = router;
