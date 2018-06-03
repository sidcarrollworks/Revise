const express = require('express');
const router = express.Router();

const dashboard = require('./dashboard.js');
const project = require('./project.js');
const user = require('./user.js');
const file = require('./file.js');

router.use('/file', file);
router.use('/dashboard', dashboard);
router.use('/project', project);
router.use('/user', user);

module.exports = router;
