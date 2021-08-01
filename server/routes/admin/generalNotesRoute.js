const express = require('express');
// const userController = require('../controllers/users/registerUser');
// const loginUser = require('../controllers/users/loginUser');
const {
  deleteNote,
} = require('../../controllers/admin/generalNotes/deleteNote');
const { addNote } = require('../../controllers/admin/generalNotes/addNote');
const {
  getAllNotes,
} = require('../../controllers/admin/generalNotes/getAllNotes');
// const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
//---------------
router.get('/', getAllNotes);
router.post('/add', addNote);
router.delete('/:id', deleteNote);
//---------------
// router.put('/:id', editNote);
// router.get('/:id', getNoteById);

module.exports = router;
