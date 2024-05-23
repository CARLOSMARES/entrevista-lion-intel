import express from "express";
import http, { Server } from "http";
import UserController from "./controllers/UserController";
import { API } from "./interfaces";
import * as routes from "./routes/routes";
import cors from 'cors';

export class ExpressApi implements API {
  private router: express.Router;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.router = express.Router();
    this.router.use(cors());
    this.router.use(express.json());
    this.router.get("/", routes.welcome);
    this.router.get("/health", routes.healthCheck);
    this.router.get("/setup", routes.setup);
    this.router.use("/api/v1/auth", routes.loginRouter);
    this.router.use("/api/v1/User", routes.user);
    this.router.use("/api/v1/sala", routes.Sala);
    this.router.post("/register", UserController.createUser);
    this.router.use("/api/v1/reservacion", routes.Reservacion);
  }

  public createServer = (): Server => {
    const expressApp: express.Application = express();

    expressApp.use("/", this.router);

    return http.createServer(expressApp);
  };
}
