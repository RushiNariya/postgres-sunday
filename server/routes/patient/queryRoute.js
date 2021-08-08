const express = require('express');
// const userController = require('../controllers/users/registerUser');
const { addQuery } = require('../../controllers/query/addQuery');
const { getAllQueries } = require('../../controllers/query/getQueries');
const { deleteQuery } = require('../../controllers/query/deleteQuery');
const { getQueryById } = require('../../controllers/query/getQueryById');
// const loginUser = require('../controllers/users/loginUser');
const { ensureToken } = require('../../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
// router.put('/:id', editQuery);

//---------------
router.get('/', ensureToken(['query:get']), getAllQueries);
router.post('/add', ensureToken('query:post'), addQuery);
router.delete('/:id', ensureToken(['query:delete']), deleteQuery);
router.get('/:id', ensureToken(['query:get']), getQueryById);
//---------------
module.exports = router;
