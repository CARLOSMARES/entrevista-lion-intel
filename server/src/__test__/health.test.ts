import request from "supertest";
import { ExpressApi } from "../api/api";
import { ServerHTTP } from "../servers/http";
import { AppDataSource } from "./../api/data-sources";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Health Check", () => {
  it("should return OK", async () => {
    const baseUrl = "http://localhost:3000";
    const api = new ExpressApi(baseUrl);
    const httpServer = new ServerHTTP(baseUrl, 3000, api.createServer());
    await httpServer.listen();
    const response = await request(baseUrl).get("/health");
    expect(response.status).toBe(200);
    await httpServer.stop();
  });
});

describe("Saludo", () => {
  it("should return welcome message", async () => {
    const baseUrl = "http://localhost:3000";
    const api = new ExpressApi(baseUrl);
    const httpServer = new ServerHTTP(baseUrl, 3000, api.createServer());
    await httpServer.listen();
    const response = await request(baseUrl).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Welcome to the API!");
    await httpServer.stop();
  });
});

describe("Setup", () => {
  it("should return welcome message", async () => {
    const baseUrl = "http://localhost:3000";
    const api = new ExpressApi(baseUrl);
    const httpServer = new ServerHTTP(baseUrl, 3000, api.createServer());
    await httpServer.listen();
    const response = await request(baseUrl).get("/setup");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "OK",
      message: "Se crea el usuario admin",
    });
    await httpServer.stop();
  });
});
