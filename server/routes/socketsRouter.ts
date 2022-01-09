import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const io = req.app.get('socketio');
  console.log(io);
  io.on("connection", (socket) => {
    console.log(`SOCKET ACCESSED: ${socket.id}`);
  })
  
  res.json(JSON.stringify('ROUTING'));
});

export default router;
