const express = require('express');
const router = express.Router();
const Raven = require('raven');

const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Project = mongoose.model('Projects');

const { isAuthProj, isProjOwner, invited } = require('../../utils/middleware/authOnProj.js');


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
          return res.status(200).json({
            success: true,
            projId: proj._id
          })
        })
        .catch(err => {
          console.log("api/project/create: ", err);
          Raven.captureException(err);
          return res.status(400).json({
            success: false
          })
        })
    }
  });
});

router.post('/:pid/create_rev', isAuthProj, (req, res) => {
  const { pid } = req.params;
  const regPopulateOwner = 'username _id avatarUrl defaultAvatar';
  const id = mongoose.Types.ObjectId();
  let newRevision = {
    title: req.body.title,
    body: req.body.body,
    owner: req.user._id,
    isFile: req.body.isFile,
    filename: req.body.isFile ? req.body.filename : "",
    filesize: req.body.isFile ? req.body.filesize : 0,
    _id: id
  };
  if (req.body.file)
    newRevision.file = req.body.file;

  Project.findOneAndUpdate({ _id: pid }, { $push: {'revisions': newRevision} })
    .then(info => {
      if (info)
        res.status(200).json({
          success: true,
          rid: id
        });
      else
        throw new Error("error creating revision");
      Project.findById(pid, 'revisions')
        .populate('revisions.owner', regPopulateOwner)
        .populate('revisions.comments.owner', regPopulateOwner)
        .then(revs => {
          req.io.to(`proj:${pid}`).emit('pUpdate', revs.revisions);
        })
        .catch(err => {
          Raven.captureException(err);
          console.log("/api/project/:pid/create 2end: ", err);
        });
    })
    .catch(err => {
      //cleanup
      Raven.captureException(err);
      console.log("/api/project/:pid/create_rev: ", err);
      res.status(400).json({
        success: false
      })
    })
});


router.post('/:pid/create_cmnt', isAuthProj, (req, res) => {
  const { pid } = req.params;
  const regPopulateOwner = 'username _id avatarUrl defaultAvatar';
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
      Project.findById(pid, 'revisions')
        .populate('revisions.owner', regPopulateOwner)
        .populate('revisions.comments.owner', regPopulateOwner)
        .then(revs => {
          req.io.to(`proj:${pid}`).emit('pUpdate', revs.revisions);
        })
        .catch(err => {
          Raven.captureException(err);
          console.log("/api/project/:pid/create 2end: ", err);
        });
    })
    .catch(err => {
      Raven.captureException(err);
      console.log("/api/project/:pid/create: ", err);
      res.status(400).json({
        success: false
      });
    });
});
//-------------------------------------------------------//

// invite member, accept invite and uninvite someone

router.post('/:pid/invite', isProjOwner, (req, res) => {
  const { pid } = req.params;
  let invitee = req.body.invitee
  
  if (invitee && req.user.username !== invitee){
    User.findOneAndUpdate({ username: invitee }, { $push: { invitedProj: pid } })
      .then(infoUser => {

        if (infoUser)
          Project.update({ _id: pid }, { $push: { invited: infoUser._id } })
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
          Raven.captureException(errU);
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

router.post('/:pid/uninvite', isProjOwner, (req, res) => {
  const { pid } = req.params;
  let unInvitee = req.body.unInvitee
  
  User.findOneAndUpdate({ username: unInvitee }, { $pull: { memberProj: pid , invitedProj: pid }})
    .then(infoUser => {

      if (infoUser)
        Project.update({ _id: pid }, { $pull: { members: infoUser._id, } })
          .then(infoProj => {

            if (infoProj.nModified != 0)
              res.status(200).json({
                success: true
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
      Raven.captureException(err);
      console.log("/api/project/:pid/invite: ", err);
      res.status(400).json({
        success: false
      })
    })
});

// do more things such as making a pull and a push in one command and test the 
// other commands and do some stuff, like add the user calls and the project calls
// 2 proj calls, pull from invited and push into members and 
// 2 user calls, push and pull from membersProj and invitedProj
router.get('/:pid/accept', invited, (req, res) => {
  const { pid } = req.params;

  Project.update({ _id: pid }, { $pull: { invited: req.user._id }, $push: { members: req.user._id } })
    .then(infoProj => {
      
      if (infoProj.nModified != 0)
        User.update({ _id: req.user._id }, { $pull: { invitedProj: pid }, $push: { memberProj: pid } })
          .then(infoUser => {

            if (infoUser.nModified != 0)
              res.status(200).json({
                success: true
              })
            else
              throw new Error("no user/mods")
          })
          .catch(errU => {
            throw errU;
          })
      else
        throw new Error("no proj/mods");
    })
    .catch(err => {
      Raven.captureException(err);
      console.log("/api/project/:pid/accept: ", err);
      res.status(400).json({
        success: false
      })
    });
});

router.get('/:pid/decline', invited, (req, res) => {
  const { pid } = req.params;

  Project.update({ _id: pid }, { $pull: { invited: req.user._id } })
    .then(infoProj => {
      
      if (infoProj.nModified != 0)
        User.update({ _id: req.user._id }, { $pull: { invitedProj: pid } })
          .then(infoUser => {

            if (infoUser.nModified != 0)
              res.status(200).json({
                success: true
              })
            else
              throw new Error("no user/mods")
          })
          .catch(errU => {
            throw errU;
          })
      else
        throw new Error("no proj/mods");
    })
    .catch(err => {
      Raven.captureException(err);
      console.log("/api/project/:pid/decline: ", err);
      res.status(400).json({
        success: false
      })
    });
});
//-------------------------------------------------------//

// Archive project

// pull project ids from invitedProj and memberProj in users
// push into archivedProj for all users
// switch isArchived to true in projects
router.get('/:pid/archive', isProjOwner, (req, res) => {
  const { pid } = req.params;

  Project.update({ _id: pid }, { isArchived: true })
    .then(infoProj => {
      if (infoProj.nModified != 0)
        res.status(200).json({
          success: true
        })
      else
        throw new Error("no proj/mods");

    })
    .catch(err => {
      Raven.captureException(err);
      console.log("/api/project/:pid/archive: ", err);
      res.status(400).json({
        success: false
      })
    });
});
// User.update(
//   { _id: { $in: Array.from(new Set(infoProj.members.concat(invited).concat(owner))) } },
//   { $pullAll: { memberProj: pid, ownedProj: pid }, $push: { memberProj: pid } },
//   { multi: true })
//-------------------------------------------------------//

// get project info

router.get('/:pid', isAuthProj, (req, res) => {
  const { pid } = req.params;
  const regPopulateOwner = 'avatarUrl defaultAvatar username _id';

  Project.findById(pid, 'title description revisions owner members invited isArchived _id createdAt')
    .populate('owner', regPopulateOwner)
    .populate('members', regPopulateOwner)
    .populate('invited', regPopulateOwner)
    .populate('revisions.owner', regPopulateOwner)
    .populate('revisions.comments.owner', regPopulateOwner)
    .exec()
    .then(info => {
      setTimeout(() => {
        res.status(200).json({
          success: true,
          info: info
        })
      }, Math.floor(Math.random() * 1700) + 200);
    })
    .catch(err => {
      Raven.captureException(err);
      console.log('api/projects/:id ', err);
      res.status(400).json({
        success: false
      })
    })
})
//-------------------------------------------------------//


module.exports = router;
