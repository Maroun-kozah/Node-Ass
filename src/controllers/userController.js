const User = require('../models/User');
const Complaint = require('../models/Complaint');
const asyncHandler = require('express-async-handler');

exports.getMyComplaints = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const count = await Complaint.countDocuments({ user: req.user._id });
    const complaints = await Complaint.find({ user: req.user._id })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({
        complaints,
        page,
        pages: Math.ceil(count / pageSize)
    });
});


exports.submitComplaint = asyncHandler(async (req, res) => {
    const { title, description, categories } = req.body;

    const complaint = new Complaint({
        user: req.user._id,
        title,
        description,
        categories,
        status: 'PENDING'
    });

    const createdComplaint = await complaint.save();
    res.status(201).json(createdComplaint);
});


exports.getComplaintDetails = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);

    if (complaint && complaint.user.equals(req.user._id)) {
        res.json(complaint);
    } else {
        res.status(404);
        throw new Error('Complaint not found');
    }
});

exports.deleteComplaint = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);

    if (complaint && complaint.user.equals(req.user._id)) {
        await complaint.remove();
        res.json({ message: 'Complaint removed' });
    } else {
        res.status(404);
        throw new Error('Complaint not found');
    }
});

exports.changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { currentPassword, newPassword } = req.body;

    if (user && (await bcrypt.compare(currentPassword, user.password))) {
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } else {
        res.status(400);
        throw new Error('Current password is wrong');
    }
});