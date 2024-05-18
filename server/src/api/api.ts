import express from "express";
import http, { Server } from "http";
import { API } from "./interfaces";
import authMiddleware from "./middleware/authModdleware";
import * as routes from "./routes/routes";

export class ExpressApi implements API {
  private router: express.Router;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.router = express.Router();
    this.router.use(express.json());
    this.router.use("/api/v1/auth", routes.loginRouter);
    this.router.use(authMiddleware);

    this.router.get("/", routes.welcome);
    this.router.get("/health", routes.healthCheck);
    this.router.use("/api/v1/User", routes.user);
  }

  public createServer = (): Server => {
    const expressApp: express.Application = express();

    expressApp.use("/", this.router);

    return http.createServer(expressApp);
  };
}
