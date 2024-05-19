import { Router } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middleware/authModdleware";
const user = Router();
user.use(authMiddleware);
user.get("/", UserController.getAllUsers);
user.post(`/`, UserController.createUser);

export default user;
