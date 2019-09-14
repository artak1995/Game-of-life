import express from 'express';
import http from 'http';
import io from 'socket.io';
import { initGrid, nextGeneration, addTemplate } from './gameOfLife';
import { generateRandomColor } from './utils';

const app = express();
const httpServer = http.createServer(app)
const port = process.env.port || 3000;
const ioServer = io(httpServer);

let grid = initGrid();
let gameInterval = () => { };
let isGameStarted = false;
let colors = [];

ioServer.on('connection', socket => {
  // Client Connected Successfully
  // Assign a random color to the socket connected
  const socketColor = generateRandomColor(colors);
  ioServer.to(socket.id).emit('setSocketColor', socketColor);
  ioServer.emit('updateGameData', { grid, isGameStarted });

  // Emit new generation every 0.2s when user started the game
  socket.on('start-game', () => {
    if (!isGameStarted) {
      isGameStarted = true;
      gameInterval = setInterval(() => {
        grid = nextGeneration(grid);
        ioServer.emit('updateGameData', { grid, isGameStarted });
      }, 200);
      ioServer.to(socket.id).emit('notification', {
        type: 'success',
        payload: { message: 'Success', description: 'Game Started Successfully' },
      });
    } else {
      ioServer.to(socket.id).emit('notification', {
        type: 'error',
        payload: { message: 'Error', description: 'Game started already' },
      });
    }
  })

  // Reinitialize the grid and send to connected sockets
  socket.on('end-game', () => {
    isGameStarted = false;
    grid = initGrid();
    ioServer.emit('updateGameData', { grid, isGameStarted });
    ioServer.to(socket.id).emit('notification', {
      type: 'success',
      payload: { message: 'Success', description: 'Ended the game successfully' },
    });
    clearInterval(gameInterval);
  })

  // Clients can add or delete live cells when game is not started
  socket.on('update-cell', data => {
    if (!isGameStarted) {
      const { col, row, isLive, socketColor } = data;
      if (isLive && grid[col][row].color !== socketColor) {
        return;
      }
      grid[col][row].isLive = !isLive;
      grid[col][row].color = socketColor;
      ioServer.emit('updateGameData', { grid, isGameStarted });
    } else {
      ioServer.to(socket.id).emit('notification', {
        type: 'error',
        payload: { message: 'Error', description: 'Game started already, please try to add after ending the game' },
      });
    }
  })

  // Clients can add a predefined cell template when game is not started
  socket.on('add-cell-template', data => {
    if (!isGameStarted) {
      const newGrid = addTemplate(grid, data);
      ioServer.emit('updateGameData', { grid: newGrid, isGameStarted });
      ioServer.to(socket.id).emit('notification', {
        type: 'success',
        payload: { message: 'Success', description: 'Added Template on grid successfully' },
      });
    } else {
      ioServer.to(socket.id).emit('notification', {
        type: 'error',
        payload: { message: 'Error', description: 'Game started already, please try to add after ending the game' },
      });
    }
  })
})

httpServer.listen(port, () => {
  console.log(`[Game of Life Server] listening to ${port}`);
})
