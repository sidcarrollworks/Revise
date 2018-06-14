module.exports = (socket) => {

  socket.on('join-project', pid => {
    if (socket.userInfo.ownedProj.indexOf(pid) > -1 || 
        socket.userInfo.memberProj.indexOf(pid) > -1
      )
      socket.join(`proj:${pid}`);
  });

  socket.on('leave-project', pid => {
    socket.leave(`proj:${pid}`)
  });
  
}
