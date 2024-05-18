import { Router } from "express";
import UserController from "../controllers/UserController";
const user = Router();
user.get("/", UserController.getAllUsers);
user.post("/register", UserController.createUser);

export default user;
