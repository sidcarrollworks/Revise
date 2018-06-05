// env variables
const { SECRET_ACCESS_KEY, ACCESS_KEY } = require('./config');

const express  = require('express');
const router   = express.Router();

const multer   = require('multer');
const aws      = require('aws-sdk');
const multerS3 = require('multer-s3');

const mongoose = require('mongoose');
const File     = mongoose.model('Files');

// configuring aws access to aws bucket
aws.config.update({
  secretAccessKey: SECRET_ACCESS_KEY,
  accessKeyId: ACCESS_KEY
});

// creating bucket endpoints
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multerS3({
    s3: s3,                                                              
    bucket: 'revise',
    key: (req, file, cb) => {

      const fileData = {
        name: file.originalname
        size: file.size,
        type: file.mimetype,
        owner: req.user._id,
        projId: req.params.pid,
      }

      let newFile = new File(fileData)

      cb(null, Date.now().toString());
    }
  })
});


// PUT files in their place

router.put('/:pid/:rid/upload', (req, res) => {

})

// View and Download files

router.get('/:pid/:rid/view', (req, res) => {

});

router.get('/:pid/:rid/download', (req, res) => {

})


module.exports = router;
