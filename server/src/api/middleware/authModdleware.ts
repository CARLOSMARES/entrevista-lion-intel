import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No Token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
      email: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Token is not valid",
    });
  }
};

export default authMiddleware;
