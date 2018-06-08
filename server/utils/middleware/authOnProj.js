module.exports = {
  isAuthProj: function(req, res, next) {
    const { pid } = req.params;
  
    if (req.user.ownedProj.indexOf(pid) != -1 || req.user.memberProj.indexOf(pid) != -1)
      next();
    else
      res.status(404).json({
        success: false,
        err: "lol"
      });
  },
  isProjOwner: function(req, res, next) {
    const { pid } = req.params;
  
    if (req.user.ownedProj.indexOf(pid) != -1)
      next();
    else
      res.status(400).json({
        success: false
      });
  },
  invited: function(req, res, next) {
    const { pid } = req.params;
  
    if (req.user.invitedProj.indexOf(pid) != -1)
      next();
    else
      res.status(404).json({
        success: false
      });
  }
}
