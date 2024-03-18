const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Route to get the logged-in user's complaints (paginated)
router.get('/my-complaints', protect, userController.getMyComplaints);

// Route to submit a new complaint
router.post('/complaint', protect, userController.submitComplaint);

// Route to get details of a specific complaint
router.get('/complaint/:id', protect, userController.getComplaintDetails);

// Route to delete a complaint
router.delete('/complaint/:id', protect, authorize('admin'), userController.deleteComplaint);

// Route to change password
router.put('/change-password', protect, userController.changePassword);

module.exports = router;