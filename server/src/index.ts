import dotenv from "dotenv";
import { ExpressApi } from "./api/api";
import { API } from "./api/interfaces";
import { AppDataSource } from "./data-sources";
import { ServerHTTP } from "./servers/http";
dotenv.config();
const host = process.env.Server_URL || "http://localhost";
const port = Number(process.env.PORT || 3000);
const BASE_URL = `${host}:${port}`;
const api: API = new ExpressApi(BASE_URL);
const httpServer = new ServerHTTP(host, port, api.createServer());
try {
  AppDataSource.initialize()
    .then(() => {
      httpServer.listen();
    })
    .catch((error) => {
      console.error(`Error during Data Source initialization: ${error}`);
    });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error starting server: ${error.message}`);
  } else {
    console.error(`Unknown error occurred`);
  }
}
