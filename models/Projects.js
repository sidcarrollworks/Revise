var mongoose = require('mongoose')

const UPLOAD_TYPE = ['text', 'file', 'pdf', 'img'] 

const projectSchema = new mongoose.Schema({
	proj_title: { type: String, required: true },
	proj_description: { type: String, required: true},
	revision: [{
	  rev_id: mongoose.Schema.Types.ObjectId,
	  title: { type: String, maxlength: 90, required: true },
	  comments: [{ type: String }],
	  userObject: [{ type: mongoose.Schema.Types.ObjectId,
			 ref: 'User',
			 required: true
	       }],
	body: { type: String, required: true },
	type: { type: String, Enum: UPLOAD_TYPE, required: true  } 
	}]
    },
    { timestamps: true }
);

const Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;