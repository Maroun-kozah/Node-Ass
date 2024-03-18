const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Submit a complaint
exports.submitComplaint = async ({ title, description, categories, createdBy }) => {
    try {
        const newComplaint = new Complaint({
            title,
            description,
            categories,
            status: 'PENDING',
            createdBy
        });

        await newComplaint.save();
        return newComplaint;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get my complaints paginated
exports.getMyComplaints = async (userId, page, limit) => {
    try {
        const complaints = await Complaint.find({ createdBy: userId })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        return complaints;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get complaint details
exports.getComplaintDetails = async (complaintId, userId) => {
    try {
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            throw new Error('Complaint not found');
        }
        if (complaint.createdBy.toString() !== userId) {
            throw new Error('Unauthorized');
        }
        return complaint;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete a complaint
exports.deleteComplaint = async (complaintId, userId) => {
    try {
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            throw new Error('Complaint not found');
        }
        if (complaint.createdBy.toString() !== userId) {
            throw new Error('Unauthorized');
        }
        await complaint.remove();
        return { message: 'Complaint deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};
