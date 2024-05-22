import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { User } from "../entities/User";
export const healthCheck = (_req: Request, res: Response): Response => {
  return res.json({ status: "OK" });
};
export const setup = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: "admin@admin.com" });
  if (!user) {
    const email = "admin@admin.com";
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
    } else {
      const hashedPassword = await bcrypt.hash("adminadmin", 10);
      const newUser = userRepository.create({
        firstName: "admin",
        lastName: "admin",
        email: email,
        password: hashedPassword,
        rol: "admin",
      });
      await userRepository.save(newUser);
    }
  }
  return res
    .status(200)
    .json({ status: "OK", message: "Se crea el usuario admin" });
};
