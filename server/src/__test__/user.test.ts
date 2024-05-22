import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthController from "../api/controllers/AuthController";
import { AppDataSource } from "../api/data-sources";

afterAll(async () => {
  await AppDataSource.destroy();
});

beforeAll(async () => {
  await AppDataSource.initialize();
});

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../api/data-sources");

describe("AuthController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    json = jest.fn();
    status = jest.fn().mockReturnValue({ json });
    req = { body: {} };
    res = { status, json };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return 400 if email or password is not provided", async () => {
      req.body = {};

      await AuthController.login(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        message: "Email and password are required",
      });
    });

    it("should return 401 if user is not found", async () => {
      req.body = { email: "test@example.com", password: "password123" };
      const userRepository = { findOneBy: jest.fn().mockResolvedValue(null) };
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(
        userRepository
      );

      await AuthController.login(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should return 401 if password is invalid", async () => {
      req.body = { email: "test@example.com", password: "password123" };
      const user = { email: "test@example.com", password: "hashedPassword" };
      const userRepository = { findOneBy: jest.fn().mockResolvedValue(user) };
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(
        userRepository
      );
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await AuthController.login(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should return token and user if credentials are valid", async () => {
      req.body = { email: "admin@admin.com", password: "adminadmin" };
      const user = {
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
      };
      const userRepository = { findOneBy: jest.fn().mockResolvedValue(user) };
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(
        userRepository
      );
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const token = "fakeToken";
      (jwt.sign as jest.Mock).mockReturnValue(token);

      await AuthController.login(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({
        token,
        user,
      });
    });
  });
});
