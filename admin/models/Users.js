const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    first_name : String,
    last_name : String,
    email : String,
    password : String,
    profile_pic : String,
    mobile_number : String,
    contact_number : String,
    role : String,
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Roles" },
    is_deleted : String,
    is_active  : String,
    created_at   : String,
    updated_at  : String,  
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);