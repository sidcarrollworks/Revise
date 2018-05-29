const userSchema = require('./User.js')
const projectSchema = require('./Project.js')

const User = mongoose.model('Users', userSchema);
const Project = mongoose.model('Projects', projectSchema);

exports.module = {
  User: User,
  Project: Project
}

