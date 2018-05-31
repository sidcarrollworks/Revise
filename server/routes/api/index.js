const express = require('express');
const router = express.Router();

// const dashboard = require('./dashboard.js');
// const project = require('./project.js');
const user = require('./user.js')

// router.use('/dashboard', dashboard);
// router.use('/project', project);
router.use('/user', user);

module.exports = router;
