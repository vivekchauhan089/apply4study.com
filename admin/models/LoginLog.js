const mongoose = require('mongoose');

const LoginLogSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ['Login_Success', 'Login_Failure'],
        required: true
    },
    hostname: {
        type: String,
        default: ''
    },
    ip_address: {
        type: String,
        default: ''
    },
    client_version: {
        type: String,
        default: ''
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // automatically manage created_at and updated_at
});

// Optional: create an index for faster lookups by username and status
LoginLogSchema.index({ username: 1, status: 1, created_at: -1 });

module.exports = mongoose.model('LoginLog', LoginLogSchema);
