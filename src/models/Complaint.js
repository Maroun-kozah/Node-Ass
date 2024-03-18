const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED'],
    default: 'PENDING'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

complaintSchema.index({ createdBy: 1 });

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
