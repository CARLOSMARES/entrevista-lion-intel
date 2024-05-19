import { Router } from 'express';
import authMiddleware from '../middleware/authModdleware';
import SalaController from '../controllers/SalaController';
const sala = Router();
sala.use(authMiddleware);
sala.get(`/`, SalaController.getAllSala);
sala.post(`/newSala`, SalaController.createSala );

export default sala;