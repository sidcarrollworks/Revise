const express = require('express');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
	secretAccessKey: SECRET_ACCESS_KEY,
	    accessKeyId: ACCESS_KEY_ID,
	    region: 'us-west-1'
	    });

const app = express();
const s3 = new aws.S3();

app.use(bodyParser.json());

const upload = multer({
	storage: multerS3({
		s3: s3,
		acl: 'public-read',
		bucket: 'nickgetsbuckets.s3.amazonaws.com',
		key: function (req, file, cb) {
		    console.log(file);
		    cb(null, Date.now().toString());
		}
	    })
    });

app.get('/images', (req, res) => {

	var keyVal = '1527706689044'; 
	const url = 'https://s3-us-west-1.amazonaws.com/nickgetsbuckets.s3.amazonaws.com/';
	var keyUrl = url + keyVal;
	s3.getObject( { Bucket: 'nickgetsbuckets.s3.amazonaws.com', Key: '1527706689044' },
		      function (error, data) {
			  if (error != null) {
			      console.log("Failed to retrieve an object: " + error);
			  } else {
			      //			      console.log("Loaded " + data.ContentLength + " bytes");
			      res.send('<img src="' + keyUrl + '">'); 
			       // res.send(data.Body)
				  }
		      }
		      )
    });

//    });

//upload form
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
    });

//used by upload form
app.post('/upload', upload.array('upl',1), (req, res, next) => {
	res.send("Uploaded!");
    });



app.listen(3000, () => {
	console.log('listening on port 3000!');
    });