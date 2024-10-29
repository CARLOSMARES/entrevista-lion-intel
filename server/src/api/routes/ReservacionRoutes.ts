import { Router } from "express";
import ReservacionController from "../controllers/ReservacionController";
import authMiddleware from "../middleware/authModdleware";
import rateLimit from "express-rate-limit";

const reservacion = Router();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

reservacion.use(authMiddleware);
reservacion.use(limiter);
reservacion.get("/", ReservacionController.getAllSala);
reservacion.post("/newReservacion", ReservacionController.createReservacion);

export default reservacion;
