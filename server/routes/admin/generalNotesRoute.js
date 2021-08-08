const express = require('express');
// const userController = require('../controllers/users/registerUser');
// const loginUser = require('../controllers/users/loginUser');
const { deleteNote } = require('../../controllers/generalNotes/deleteNote');
const { addNote } = require('../../controllers/generalNotes/addNote');
const { getAllNotes } = require('../../controllers/generalNotes/getAllNotes');
const { ensureToken } = require('../../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
//---------------
router.get('/', ensureToken(['note:get']), getAllNotes);
router.post('/add', ensureToken(['note:post']), addNote);
router.delete('/:id', ensureToken(['note:delete']), deleteNote);
//---------------
// router.put('/:id', editNote);
// router.get('/:id', getNoteById);

module.exports = router;
