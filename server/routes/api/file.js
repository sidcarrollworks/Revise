
// env variables
const { MONGO_CONN } = require('../../../config');

const express        = require('express');
const router         = express.Router();

const uuidv4         = require('uuid/v4');
const multer         = require('multer');
const path           = require('path');
const crypto         = require('crypto');
const GridFsStorage  = require('multer-gridfs-storage');
const Grid           = require('gridfs-stream');
const methodOverride = require('method-override');

const mongoose       = require('mongoose');

const { isAuthProj } = require('../../utils/middleware/authOnProj.js');

// middleware
router.use(methodOverride('_method'));


// Init stream 
let Gfs = Grid(mongoose.connection.db, mongoose.mongo);
Gfs.collection('Uploads');

// Create Storage Engine
const storage = new GridFsStorage({
	url: MONGO_CONN,
	file: (req, file) => {
		const { pid, rid } = req.params;
		return new Promise((resolve, reject) => {
			const fileInfo = {
				filename: uuidv4().substring(0, 8) + "-" + file.originalname,
				bucketName: 'Uploads',
				chunkSize: file.chunkSize,
				metadata: {
					projectId: pid,
					revisionId: rid,
					originalFilename: file.originalname,
				}
			};
			resolve(fileInfo);
		});
	}
});

const upload = multer({ storage });


// PUT files in their place
// isAuthProj
router.put('/:pid/:rid/upload', upload.single('file'), (req, res) => {
	console.log(req.file)
	if (req.file)
		res.status(200).json({success: true})
	else
		res.status(400).json({success: false})
})

// View and Download files
// isAuthProj
// router.get('/:pid/:rid/download/', (req, res) => {
router.get('/download/:fn', (req, res) => {
	Gfs.files.findOne({ filename: req.params.fn })
		.then(file => {
			console.log(file)
			if (!file || file.length === 0)
				res.status(401);
			console.log("beef")
			let steam = Gfs.createReadStream({ _id: file._id })
			console.log("after")
			steam.pipe(res);
				// Gfs.createReadStream({ _id: file._id }).pipe(res);
		})
		.catch(err => {
			console.log("/:pid/:rid/download : ", err);
			res.status(401);
		})
})

// router.get('/:pid/:rid/view', isAuthProj, (req, res) => {

// });



module.exports = router;
