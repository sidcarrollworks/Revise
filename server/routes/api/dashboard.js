const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('Users');

router.get('/info', (req, res) => {
  User.findById(req.user._id, 'connections ownedProj memberProj invitedProj')
    .populate('connections', 'avatarUrl username')
    .populate('ownedProj', 'title isArchived _id')
    .populate('memberProj', 'title isArchived _id')
    .populate('invitedProj', 'title _id')
    .exec()
    .then(info => {
      console.log(info)
      res.status(200).json({
        success: true,
        info: info
      })
    })
    .catch(err => {
      console.log('api/dashboard/info: ', err);
      res.status(400).json({
        success: false
      })
    })
})




module.exports = router;
