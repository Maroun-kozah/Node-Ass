const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const complaintController = require('../controllers/complaintController');
const auth = require('../middlewares/validation');


router.post('/', auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('categories', 'Categories are required').isArray({ min: 1 }),
], complaintController.submitComplaint);


router.get('/', auth, complaintController.getMyComplaints);


router.get('/:id', auth, complaintController.getComplaintDetails);


router.delete('/:id', auth, complaintController.deleteComplaint);

module.exports = router;
