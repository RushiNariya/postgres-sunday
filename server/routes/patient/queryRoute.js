const express = require('express');
// const userController = require('../controllers/users/registerUser');
const { addQuery } = require('../../controllers/patient/query/addQuery');
const {
  getAllQueries,
} = require('../../controllers/patient/query/getQueries');
const {
  deleteQuery,
} = require('../../controllers/patient/query/deleteQuery');
const {
  getQueryById,
} = require('../../controllers/patient/query/getQueryById');
// const loginUser = require('../controllers/users/loginUser');
// const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
// router.put('/:id', editQuery);

//---------------
router.get('/', getAllQueries);
router.post('/add', addQuery);
router.delete('/:id', deleteQuery);
router.get('/:id', getQueryById);
//---------------
module.exports = router;
