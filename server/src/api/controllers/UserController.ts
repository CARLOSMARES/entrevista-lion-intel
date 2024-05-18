import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { User } from "../entities/User";
class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  }
  static async createUser(req: Request, res: Response) {
    const { firstName, lastName, email, password, rol } = req.body;
    if (!(firstName && lastName && email && password && rol)) {
      return res.json(400).json({
        message: `firstName, lastName, email, password and rol are required`,
      });
    }
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(409).json({
        mssage: `User already exists`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      rol,
    });
    await userRepository.save(newUser);
    res.status(201).json(newUser);
  }
}

export default UserController;
