module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  let users = [];
  let msgs = [];
  let count = 0;

  io.on(`connection`, socket => {

    const {id: socketId} = socket;

    count++;

    const user = {
      socketId,
      username: `guest-${count}`
    };

    users.push(user);

    socket.emit(`init`, {users, msgs, user});
    socket.broadcast.emit(`join`, user);

    socket.on(`disconnect`, () => {
      users = users.filter(u => u.socketId !== socketId);
      socket.broadcast.emit(`leave`, {socketId, user});
    });


    socket.on(`setUsername`, username => {
      user.old_username = user.username;
      user.username = username;
      socket.broadcast.emit(`setUsername`, {username, socketId, old_username: user.old_username});
    });


    socket.on(`msg`, msg => {
      msgs.push({msg, socketId, user});
      socket.broadcast.emit(`msg`, {msg, socketId, user});
    });



    socket.on(`pm`, to => {
      io.to(to).emit(`pm`, socketId);
    });

  });


  next();

};

module.exports.register.attributes = {
  name: `chat`,
  version: `0.1.0`
};
