
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

const conn = mongoose.createConnection(MONGO_CONN);
// Init stream 
let Gfs
conn.once('open', () => {
	Gfs = Grid(conn.db, mongoose.mongo);
	Gfs.collection('Uploads');
});

// Create Storage Engine
const storage = new GridFsStorage({
	url: MONGO_CONN,
	file: (req, file) => {
		const { pid, rid } = req.params;
		return new Promise((resolve, reject) => {
			const fileInfo = {
				filename: uuidv4().slice(0, 8) + "-" + file.originalname,
				bucketName: 'Uploads',
				chunkSize: file.chunkSize,
				metadata: {
					pId: pid,
					rId: rid
				}
			};
			resolve(fileInfo);
		});
	}
});

const upload = multer({ storage });


// PUT files in their place

router.put('/:pid/:rid/upload', isAuthProj, upload.single('file'), (req, res) => {
	console.log(req.file)
	if (req.file)
		res.status(200).json({success: true})
	else
		res.status(400).json({success: false})
})

// View and Download files

router.get('/:pid/:rid/download/', isAuthProj, (req, res) => {
	const { pid, rid } = req.params;

	Gfs.files.findOne({ metadata: { pId: pid, rId: rid } })
		.then(file => {
			if (!file || file.length === 0)
				res.status(401);
			else {
				res.set("filename", file.filename);
				Gfs.createReadStream({ _id: file._id }).pipe(res), res.status(200);
			}
			})
		.catch(err => {
			Raven.captureException(err);
			console.log("/:pid/:rid/download : ", err);
			res.status(401);
		})
})


// });



module.exports = router;
