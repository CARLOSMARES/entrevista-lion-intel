import { DataSource } from "typeorm";
import { User } from "./api/entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "databas.sqlite",
  entities: [User],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error(`Error during Data Source initialization: ${err}`);
  });
