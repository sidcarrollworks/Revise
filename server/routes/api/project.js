const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Project = mongoose.model('Projects');

const { isAuthProj, isProjOwn, invited } = require('../../utils/middleware/authOnProj.js');


// Creating new proj, revision,comment

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
});

router.post('/:pid/create_rev', isAuthProj, (req, res) => {
  const { pid } = req.params;
  let newRevision = {
    title: req.body.title,
    body: req.body.body,
    owner: req.user._id
  };
  if (req.body.file)
    newRevision.file = req.body.file;

  Project.update({ _id: pid }, { $push: {'revisions': newRevision} })
    .then(info => {
      res.status(200).json({
        success: true
      })
    })
    .catch(err => {
      console.log("/api/project/:pid/create_rev: ", err);
      res.status(400).json({
        success: false
      })
    })
});


router.post('/:pid/create_cmnt', isAuthProj, (req, res) => {
  const { pid } = req.params;
  let newComment = {
    text: req.body.text,
    owner: req.user._id
  };
  
  Project.update({ _id: pid, 'revisions._id': req.body.revId }, { $push: {'revisions.$.comments': newComment} })
    .then(info => {
      if (info.nModified == 0)
        res.status(401).json({
          success: false
        });
      else
        res.status(200).json({
          success: true
        });
    })
    .catch(err => {
      console.log("/api/project/:pid/create: ", err);
      res.status(400).json({
        success: false
      });
    });
});
//-------------------------------------------------------//

// invite member, accept invite and uninvite someone

router.post('/:pid/invite', isProjOwn, (req, res) => {
  const { pid } = req.params;
  let invitee = req.body.invitee
  
  if (invitee){
    User.update({ _id: invitee }, { $push: { invitedProj: pid } })
      .then(infoUser => {

        if (infoUser.nModified != 0)
          Project.update({ _id: pid }, { $push: { invited: invitee } })
            .then(infoProj => {

              if (infoProj.nModified != 0)
                res.status(200).json({
                  success: true
                })
              else
                throw new Error("no proj/mods");
            })
            .catch(errP => {
              throw errP;
            });
        else
          throw new Error("no user/mods");
        })
        .catch(errU => {
          console.log("/api/project/:pid/invite U: ", errU);
          res.status(400).json({
            success: false
          });
        });
  } else {
    res.status(400).json({
      success: false
    });
  }
});

router.post('/:pid/uninvite', isProjOwn, (req, res) => {
  const { pid } = req.params;
  let unInvitee = req.body.unInvitee
  
  User.update({ _id: unInvitee }, { $pullAll: { memberProj: pid , invitedProj: pid }})
    .then(infoUser => {

      if (infoUser.nModified != 0)
        Project.update({ _id: pid }, { $pull: { members: unInvitee } })
          .then(infoProj => {

            if (infoProj.nModified != 0)
              res.status(200).json({
                success: false
              })
            else
              throw new Error("no proj/mods")
          })
          .catch(errP => {
            throw errP;
          })
      else
        throw new Error("no user/mods");
    })
    .catch(err => {
      console.log("/api/project/:pid/invite: ", err);
      res.status(400).json({
        success: false
      })
    })
});

router.post('/:pid/accept', invited, (req, res) => {
  const { pid } = req.params;
});
//-------------------------------------------------------//

// get project info

router.get('/:pid', isAuthProj, (req, res) => {
  const { pid } = req.params;

  Project.findById(pid, 'title description revisions owner members invited isArchived _id createdAt')
    .populate('owner', 'avatarUrl username _id')
    .populate('members', 'avatarUrl username _id')
    .populate('invited', 'avatarUrl username _id')
    .populate('revisions.file', 'name type path size type')
    .populate('revisions.owner', 'avatarUrl username _id')
    .populate('revisions.comments.owner', 'avatarUrl username _id')
    .exec()
    .then(info => {
      setTimeout(() => {
        res.status(200).json({
          success: true,
          info: info
        })
      }, Math.floor(Math.random() * 2400) + 800);
    })
    .catch(err => {
      console.log('api/projects/:id ', err);
      res.status(400).json({
        success: false
      })
    })
})
//-------------------------------------------------------//

module.exports = router;
