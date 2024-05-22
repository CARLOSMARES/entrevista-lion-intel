import { DataSource, Table } from "typeorm";
import { Reservacion } from "./entities/Reservacion";
import { Sala } from "./entities/Sala";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [User, Sala, Reservacion],
  synchronize: false,
  logging: false,
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const dbExist = await queryRunner.hasDatabase("database.sqlite");
    if (!dbExist) {
      await queryRunner.createDatabase("database.sqlite");
    } else {
      console.log("La base de datos ya existe");

      const userTableExists = await queryRunner.hasTable("user");
      if (!userTableExists) {
        await queryRunner.createTable(
          new Table({
            name: "user",
            columns: [
              {
                name: "id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              { name: "firstName", type: "varchar" },
              { name: "lastName", type: "varchar" },
              { name: "email", type: "varchar" },
              { name: "password", type: "varchar" },
              { name: "rol", type: "varchar" },
            ],
          })
        );
      }

      const salaTableExists = await queryRunner.hasTable("Sala");
      if (!salaTableExists) {
        await queryRunner.createTable(
          new Table({
            name: "Sala",
            columns: [
              {
                name: "id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              { name: "disponible", type: "varchar" },
              { name: "numeroSala", type: "integer" },
              { name: "pantalla", type: "varchar" },
              { name: "telefono", type: "varchar" },
              { name: "wifi", type: "varchar" },
              { name: "numeroAsientos", type: "integer" },
            ],
          })
        );
      }

      const reservaTableExists = await queryRunner.hasTable("Reservacion");
      if (!reservaTableExists) {
        await queryRunner.createTable(
          new Table({
            name: "Reservacion",
            columns: [
              {
                name: "id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              { name: "nameUsuario", type: "varchar" },
              { name: "fecha", type: "date" },
              { name: "hora", type: "date" },
              { name: "numeroSala", type: "integer" },
            ],
          })
        );
      }
    }
    await queryRunner.release();
  })
  .catch((err) => {
    console.error(`Error during Data Source initialization: ${err}`);
  });
