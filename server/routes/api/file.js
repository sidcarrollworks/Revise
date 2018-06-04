const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const File = mongoose.model('Files');


// PUT files in their place

router.put('/:pid/:rid/upload', (req, res) => {

})


// View and Download files

router.get('/:pid/:rid/view', (req, res) => {

});

router.get('/:pid/:rid/download', (req, res) => {

})


module.exports = router;
