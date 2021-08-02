const express = require('express');
// const userController = require('../controllers/users/registerUser');
const {
  getAllPendingQueries,
} = require('../../controllers/hospitalAdmin/query/getAllPendingQueries');
const {
  answerQuery,
} = require('../../controllers/hospitalAdmin/query/answerQuery');
// const {
//   getQueryById,
// } = require('../../controllers/patient/query/getQueryById');
// const loginUser = require('../controllers/users/loginUser');
// const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);

//---------------
router.get('/', getAllPendingQueries);
router.post('/answered/:id', answerQuery);
//---------------

// router.delete('/:id', deleteQuery);

//---------------
// router.get('/forward', forwardQuery);
// router.get('/:id', getQueryById);
//---------------

module.exports = router;
