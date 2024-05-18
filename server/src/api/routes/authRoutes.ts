import { Router } from "express";
import AuthController from '../controllers/AuthController';
const loginRouter = Router();
loginRouter.post('/login', AuthController.login);

export default loginRouter;