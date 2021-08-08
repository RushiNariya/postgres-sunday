const express = require('express');
const {
    addAnnouncement,
} = require('../../controllers/announcement/addAnnouncement');
const {
    getAnnouncements,
} = require('../../controllers/announcement/getAnnouncements');
const {
    deleteAnnouncement,
} = require('../../controllers/announcement/deleteAnnouncement');
// const loginUser = require('../controllers/users/loginUser');
const { ensureToken } = require('../../utils/jwtUtils');

const router = express.Router();

// router.get('/category', getAllCategory);
//---------------
router.get('/', ensureToken(['announcement:get']), getAnnouncements);
router.post('/add', ensureToken(['announcement:post']), addAnnouncement);
router.delete('/:id', ensureToken(['announcement:delete']), deleteAnnouncement);
//---------------
// router.put('/:id', editAnnouncement);
// router.get('/:id', getAnnouncementById);

module.exports = router;
