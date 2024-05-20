import { Router } from "express";
import ReservacionController from "../controllers/ReservacionController";
import authMiddleware from "../middleware/authModdleware";
const reservacion = Router();

reservacion.use(authMiddleware);
reservacion.get("/", ReservacionController.getAllSala);
reservacion.post("/newReservacion", ReservacionController.createReservacion);

export default reservacion;
