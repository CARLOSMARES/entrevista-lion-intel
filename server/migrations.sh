npx typeorm-ts-node-commonjs migration:generate src/api/migrations/InitialMigration -d src/api/data-sources.ts
npx typeorm-ts-node-commonjs migration:run -d src/api/data-sources.ts