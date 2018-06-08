const mongoose = require('mongoose');
// var uuidv4 = require('uuid/v4');
// uuidv4().replace('-', '').slice(0, 8)


// subsub comment schema
const commentSchema = new mongoose.Schema({
	text: { type: String, required: true },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
	createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// revision sub schema
const revisionSchema = new mongoose.Schema({
	// revId: { type: String, minlength: 8, maxlength: 8, required: true, unique: true },
	title: { type: String, maxlength: 120, required: true },
	comments: [commentSchema],
	body:  { type: String, required: false },
	isFile: { type: Boolean, required: true },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
}, { timestamps: true });

// parent Schema
const projectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	revisions: [revisionSchema],
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: false }],
	invited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: false }],
	isArchived: {type: Boolean, default: false, required: false }
}, { timestamps: true });

// Projects.create({ proj_title: 'My Project v2', proj_description: 'Just another day', revision: [{title: 'This is my title', project_owner: ['5b0bc0bba4d0e82d58f71bbc'], body: 'new_body', type: 'text'}]})

mongoose.model('Projects', projectSchema);
