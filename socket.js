// socket.js
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import User from './models/User.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let onlineUsers = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-project', async ({ projectId, userId }) => {
    const user = await User.findById(userId).select('name');
    onlineUsers[userId] = { name: user.name, socketId: socket.id };
    
    io.emit('update-online-users', onlineUsers);
    
    socket.join(projectId);
  });

  socket.on('disconnect', () => {
    delete onlineUsers[socket.handshake.query.userId];
    io.emit('update-online-users', onlineUsers);
  });
});

server.listen(process.env.SOCKET_PORT || 3001, () => {
  console.log('Socket server listening on port 3001');
});
