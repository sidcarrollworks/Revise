module.exports = {
  isAuthProj : function(req, res, next) {
    const { id } = req.params;
  
    if (req.user.ownedProj.indexOf(id) != -1 || req.user.memberProj.indexOf(id) != -1)
      next();
    else
      res.status(400).json({
        success: false
      });
  },
  isProjOwner: function(req, res, next) {
    const { id } = req.params;
  
    if (req.user.ownedProj.indexOf(id) != -1)
      next();
    else
      res.status(400).json({
        success: false
      });
  }
}
