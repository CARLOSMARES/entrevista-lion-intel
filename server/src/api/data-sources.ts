import bcrypt from "bcrypt";
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
    const userRepository = AppDataSource.getRepository(User);
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
  })
  .catch((err) => {
    console.error(`Error during Data Source initialization: ${err}`);
  });
