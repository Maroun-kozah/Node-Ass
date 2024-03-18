const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Submit a complaint
exports.submitComplaint = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, categories } = req.body;

    try {
        const newComplaint = new Complaint({
            title,
            description,
            categories,
            status: 'PENDING',
            createdBy: req.user.id
        });

        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get my complaints paginated
exports.getMyComplaints = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const complaints = await Complaint.find({ createdBy: req.user.id })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.json(complaints);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get complaint details
exports.getComplaintDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ msg: 'Complaint not found' });
        }

        if (complaint.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        res.json(complaint);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a complaint
exports.deleteComplaint = async (req, res) => {
    const { id } = req.params;

    try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ msg: 'Complaint not found' });
        }

        if (complaint.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        await complaint.remove();
        res.json({ msg: 'Complaint deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
