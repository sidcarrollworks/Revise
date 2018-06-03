const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  path: { type: String, required: false },
  type: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  projId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true }
}, { timestamps: true });


// checks type of file and addes it to type
// fileSchema.pre('save', function(next) {
// 	if(this.isModified('password'))
// 		this.password = bcrypt.hashSync(this.password, 10);
// 	next();
// })

mongoose.model('Files', fileSchema);
