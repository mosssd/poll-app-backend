import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PollData, ClientToServerEvents, ServerToClientEvents } from './types';

const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  }
});

let pollData: PollData = {
  "Dog": 0,
  "Cat": 0,
  "Rabbit": 0,
  "Snake": 0
};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.emit('update_results', pollData);

  socket.on('vote_cast', (framework: string) => {
    if (pollData[framework] !== undefined) {
      pollData[framework]++;
      
      io.emit('update_results', pollData);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(3001, () => {
  console.log('TS SERVER RUNNING ON PORT 3001');
});