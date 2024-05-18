import { DataSource, Table } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [User],
  synchronize: false,
  logging: false,
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    const tableExists = await queryRunner.hasTable("user"); // Nota: asegúrate de usar el nombre correcto de la tabla en minúsculas
    if (!tableExists) {
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
            {
              name: "firstName",
              type: "varchar",
            },
            {
              name: "lastName",
              type: "varchar",
            },
            {
              name: "email",
              type: "varchar",
            },
            {
              name: "password",
              type: "varchar",
            },
            {
              name: "rol",
              type: "varchar",
            },
          ],
        })
      );
      console.log("User table created.");
    }
    await queryRunner.release();
  })
  .catch((err) => {
    console.error(`Error during Data Source initialization: ${err}`);
  });
