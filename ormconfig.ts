import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import {DataSource} from "typeorm";

// const config: SqliteConnectionOptions = {
//     type: 'sqlite',
//     database: 'db',
//     entities: ['dist/src/**/*.entity.js'],
//     synchronize: false,
//     migrations: ["dist/src/migrations/*.js"],
// };

// export default config;

export const config = new DataSource({
    type: 'sqlite',
    database: 'db',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
    migrations: ["dist/src/migrations/*.js"],
});