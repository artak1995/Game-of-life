import express from 'express';
import http from 'http';
import io from 'socket.io';
import { initGrid, nextGeneration } from './gameOfLife';
import { generateRandomColor } from './utils';

const app = express();
const httpServer = http.createServer(app)
const port = 3000;
const ioServer = io(httpServer);

let grid = initGrid();
let gameInterval = () => { };
let isGameStarted = false;
let colors = [];

ioServer.on('connection', socket => {
  console.log('[Game of Life Server] Client connected');

  const socketColor = generateRandomColor(colors);
  ioServer.to(socket.id).emit('setSocketColor', socketColor);
  ioServer.emit('updateGameData', { grid, isGameStarted });

  socket.on('start-game', () => {
    if (!isGameStarted) {
      isGameStarted = true;
      console.log('[Game of Life Server] Recieved start game request');
      gameInterval = setInterval(() => {
        grid = nextGeneration(grid);
        ioServer.emit('updateGameData', { grid, isGameStarted });
      }, 200);
    }
  })

  socket.on('end-game', () => {
    isGameStarted = false;
    grid = initGrid();
    ioServer.emit('updateGameData', { grid, isGameStarted });
    console.log('game stopped');
    clearInterval(gameInterval);
  })

  socket.on('update-cell', data => {
    if (!isGameStarted) {
      const { col, row, isLive, socketColor } = data;
      if (isLive && grid[col][row].color !== socketColor) {
        return;
      }
      grid[col][row].isLive = !isLive;
      grid[col][row].color = socketColor;
      ioServer.emit('updateGameData', { grid, isGameStarted });
    }
  })
})

httpServer.listen(port, () => {
  console.log(`[Game of Life Server] listening to ${port}`);
})
