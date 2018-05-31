const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const GENDERS = ['male', 'female', 'other'];

const userSchema = new mongoose.Schema ({
	firstName: { type: String, required: true }, 
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	dateOfBirth: { type: String, required: true },
	artistPage: { type: Boolean, default: false },
	password: { type: String, required: true/*, minlength: 60, maxlength: 60 */},
	avatarUrl: { type: String },
	gender: { type: String, enum: GENDERS, required: true },
	connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
	ownedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	invitedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }]
}, { timestamps: true });

// easy validation of user password against hash
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

// middleware: before saving, check if password was changed
// and then hash it before saving
userSchema.pre('save', function(next) {
	if(this.isModified('password'))
		this.password = bcrypt.hashSync(this.password, 10);
	next();
})

module.exports = mongoose.model('Users', userSchema);



