const mongoose = require('mongoose');
// var uuidv4 = require('uuid/v4');
// uuidv4().replace('-', '').slice(0, 8)

const UPLOAD_TYPE = ['text', 'file', 'pdf', 'img'];

// subsub comment schema
const commentSchema = new mongoose.Schema({
	body: { type: String, required: true },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
}, { timestamps: true });

// revision sub schema
const revisionSchema = new mongoose.Schema({
	// revId: { type: String, minlength: 8, maxlength: 8, required: true, unique: true },
	title: { type: String, maxlength: 90, required: true },
	comments: [commentSchema],
	body: { type: String, required: true },
	type: { type: String, Enum: UPLOAD_TYPE, required: true },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
}, { timestamps: true });

// parent Schema
const projectSchema = new mongoose.Schema({
	projTitle: { type: String, required: true },
	projDescription: { type: String, required: true },
	revision: [revisionSchema],
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: false }]
}, { timestamps: true });

// Projects.create({ proj_title: 'My Project v2', proj_description: 'Just another day', revision: [{title: 'This is my title', project_owner: ['5b0bc0bba4d0e82d58f71bbc'], body: 'new_body', type: 'text'}]})

module.exports = mongoose.model('Projects', projectSchema);
