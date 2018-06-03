const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Project = mongoose.model('Projects');

const { isAuthProj, isProjOwn } = require('../../utils/middleware/authOnProj.js');


router.post('/create', (req, res) => {
  const { title, description } = req.body;
  const projData = {
    title: title,
    description: description,
    owner: req.user._id
  }

  const newProj = new Project(projData);
  newProj.save((error, proj) => {
    if (error) {
      console.log("api/project/create: ", error);
      return res.status(400).json({
        success: false
      })
    } else {
      User.update({ _id: req.user._id }, { $push: { ownedProj: proj._id }})
        .then(user => {
          return res.status(400).json({
            success: true,
            projId: proj._id
          })
        })
        .catch(err => {
          console.log("api/project/create: ", err);
          return res.status(400).json({
            success: false
          })
        })
    }
  });
})

router.get('/:id', isAuthProj, (req, res) => {
  const { id } = req.params;

  Project.findById(id, 'title description revisions owner members invited isArchived _id')
  .populate('owner', 'avatarUrl username _id')
  .populate('members', 'avatarUrl username _id')
  .populate('invited', 'avatarUrl username _id')
  .populate('revisions.file', 'name type path size type')
  .populate('revisions.owner', 'avatarUrl username _id')
  .populate('revisions.comments.owner', 'avatarUrl username _id')
  .exec()
  .then(info => {
    res.status(200).json({
      success: true,
      info: info
    })
  })
  .catch(err => {
    console.log('api/projects/:id ', err);
    res.status(400).json({
      success: false
    })
  })
})

router.get('/:id/', isAuthProj, (req, res) => {
  const { id } = req.params;

  

})

module.exports = router;
