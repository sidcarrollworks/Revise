const mongoose = require('mongoose');

const GENDERS = ['Male', 'Female', 'Other'];

const userSchema = new mongoose.Schema ({
	firstName: { type: String, required: true }, 
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	userName: { type: String, required: true, unique: true},
	dateOfBirth: { type: Date, required: true },
	artistPage: { type: Boolean, default: true },
	password: { type: String, required: true, minlength: 60, maxlength: 60 },
	avatarUrl: { type: String },
	gender: { type: String, enum: GENDERS, required: true },
	connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
	ownedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	invitedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }]
}, { timestamps: true });

module.exports = userSchema;



