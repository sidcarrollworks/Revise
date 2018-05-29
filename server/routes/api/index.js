const express = require('express');
const router = express.Router();

const dashboard = require('./dashboard.js');
const project = require('./project.js');

router.use('/dashboard', dashboard);
router.use('/project', project);

module.exports = router;
