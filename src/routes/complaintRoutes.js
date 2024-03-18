const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const complaintController = require('../controllers/complaintController');
const auth = require('../middlewares/validation');

// @route   POST /api/complaints
// @desc    Submit a complaint
// @access  Private
router.post('/', auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('categories', 'Categories are required').isArray({ min: 1 }),
], complaintController.submitComplaint);

// @route   GET /api/complaints
// @desc    Get my complaints paginated
// @access  Private
router.get('/', auth, complaintController.getMyComplaints);

// @route   GET /api/complaints/:id
// @desc    Get my complaint details
// @access  Private
router.get('/:id', auth, complaintController.getComplaintDetails);

// @route   DELETE /api/complaints/:id
// @desc    Delete a complaint
// @access  Private
router.delete('/:id', auth, complaintController.deleteComplaint);

module.exports = router;
