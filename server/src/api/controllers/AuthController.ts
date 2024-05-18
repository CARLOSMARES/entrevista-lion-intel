import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-sources";
import { User } from "../entities/User";

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        message: `Email and password are required`,
      });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(401).json({
        message: `Invalid credentials`,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: `Invalida credentials`,
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: `1h`,
      }
    );

    return res.json({
      token,
    });
  }
}

export default AuthController;
