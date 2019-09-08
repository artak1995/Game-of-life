import express from 'express';
import http from 'http';
import io from 'socket.io';

const app = express();
const httpServer = http.createServer(app)
const port = 3000;
const ioServer = io(httpServer);

let isGameStarted = false;

ioServer.on('connection', socket => {
  console.log('[Game of Life Server] Client connected');
  socket.on('join-game-request', () => {
    if (!isGameStarted) {
      socket.join('game-of-life')
    }
  })


})

httpServer.listen(port, () => {
  console.log(`[Game of Life Server] listening to ${port}`);
})
