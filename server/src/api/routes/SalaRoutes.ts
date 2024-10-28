import { Router } from 'express';
import authMiddleware from '../middleware/authModdleware';
import SalaController from '../controllers/SalaController';
import rateLimit from 'express-rate-limit';
const sala = Router();

// Rate limiter configuration: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

sala.use(limiter);
sala.use(authMiddleware);
sala.get(`/`, SalaController.getAllSala);
sala.post(`/newSala`, SalaController.createSala );

export default sala;