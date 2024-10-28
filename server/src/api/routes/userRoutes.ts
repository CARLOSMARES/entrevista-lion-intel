import { Router } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middleware/authModdleware";
import rateLimit from "express-rate-limit";

const user = Router();

// Configure rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiter to all requests
user.use(limiter);

user.use(authMiddleware);
user.get("/", UserController.getAllUsers);
user.post(`/`, UserController.createUser);

export default user;
