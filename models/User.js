var mongoose = require('mongoose');

const GENDERS = ['Male', 'Female', 'Other'];

const userSchema = new mongoose.Schema (
    {
	firstName: { type: String, required: true }, 
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	dateOfBirth: { type: Date, required: true },
	artistPage: { type: Boolean, default: false },
	password: { type: String, required: true, minlength: 60, maxlength: 60 },
	avatarUrl: { type: String },
	gender: { type: String, enum: GENDERS, required: true },
	connections: [{
	      type: mongoose.Schema.Types.ObjectId,
	      ref: 'User'
	 }],
	 ownedProjects: [{
	      type: mongoose.Schema.Types.ObjectId,
	      ref: 'Projects'
	 }],
	 invitedProjects: [{
	      type: mongoose.Schema.Types.ObjectId,
	      ref: 'Projects'
	 }]
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;



