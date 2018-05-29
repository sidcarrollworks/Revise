var mongoose = require('mongoose');
var uuidv1 = require('uuid/v1');

const UPLOAD_TYPE = ['text', 'file', 'pdf', 'img'];

const projectSchema = new mongoose.Schema({
	proj_title: { type: String, required: true },
	proj_description: { type: String, required: true},
	revision: [{
		rev_id: { type: String, default: uuidv1().replace('-', '').slice(0, 8) },
	  title: { type: String, maxlength: 90, required: true },
	  comments: [{ type: String }],
	  body: { type: String, required: true },
          type: { type: String, Enum: UPLOAD_TYPE, required: true  },
	  project_owner_id: [{ type: mongoose.Schema.Types.ObjectId,
			 ref: 'User',
			 required: true
	       }],
	}]
    },
    { timestamps: true }
);

const Projects = mongoose.model('Projects', projectSchema);

Projects.create({ proj_title: 'My Project v2', proj_description: 'Just another day', revision: [{title: 'This is my title', project_owner: ['5b0bc0bba4d0e82d58f71bbc'], body: 'new_body', type: 'text'}]})

module.exports = Projects;