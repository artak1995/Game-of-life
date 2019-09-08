import express from 'express';
import http from 'http';
import io from 'socket.io';
import initGrid from './gameOfLife';

const app = express();
const httpServer = http.createServer(app)
const port = 3000;
const ioServer = io(httpServer);
const grid = initGrid();

let gameInterval = () => { };
let isGameStarted = false;


ioServer.on('connection', socket => {
  console.log('[Game of Life Server] Client connected');

  if (!isGameStarted) {
    socket.join('game-of-life')
  } else {
    socket.join('pending-room');
  }

  ioServer.emit('updateGameData', grid);

  socket.on('start-game', () => {
    if (!isGameStarted) {
      isGameStarted = true;
      console.log('[Game of Life Server] Recieved start game request');
      gameInterval = setInterval(() => {
        ioServer.to('game-of-life').emit('updateGameData', grid);
        console.log('game running');
      }, 1000);
    }
  })

  socket.on('end-game', () => {
    isGameStarted = false;
    console.log('game stopped');
    clearInterval(gameInterval);
  })
})

httpServer.listen(port, () => {
  console.log(`[Game of Life Server] listening to ${port}`);
})
