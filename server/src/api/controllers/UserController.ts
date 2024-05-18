import { Request, Response } from "express";
import { AppDataSource } from "../../data-sources";
import { User } from "../entities/User";
class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  }
  static async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({ name, email });
    await userRepository.save(newUser);
    res.status(201).json(newUser);
  }
}

export default UserController;
