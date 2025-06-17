import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

import disasterRoutes from './routes/disasters.js';
import geocodeRoutes from './routes/geocode.js';
import socialRoutes from './routes/social.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());

app.use('/disasters', disasterRoutes(io));
app.use('/geocode', geocodeRoutes);
app.use('/social', socialRoutes(io));

app.get('/', (req, res) => {
  res.send('Disaster Response API Running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});