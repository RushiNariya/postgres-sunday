const express = require('express');
const {
  addAnnouncement,
} = require('../../controllers/hospitalAdmin/announcement/addAnnouncement');
const {
  getAnnouncements,
} = require('../../controllers/hospitalAdmin/announcement/getAnnouncements');
const {
  deleteAnnouncement,
} = require('../../controllers/hospitalAdmin/announcement/deleteAnnouncement');
// const loginUser = require('../controllers/users/loginUser');
// const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
//---------------
router.get('/', getAnnouncements);
router.post('/add', addAnnouncement);
router.delete('/:id', deleteAnnouncement);
//---------------
// router.put('/:id', editAnnouncement);
// router.get('/:id', getAnnouncementById);

module.exports = router;
