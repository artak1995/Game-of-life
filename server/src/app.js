import express from 'express';
import http from 'http';
import io from 'socket.io';

const app = express();
const httpServer = http.createServer(app)
const port = 3000;
const ioServer = io(httpServer);

httpServer.listen(port, () => {
  console.log(`[Game of Life Server] listening to ${port}`);
})
