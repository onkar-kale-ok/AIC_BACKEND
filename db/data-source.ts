import { configData } from "src/config/db.config";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configData.HOST || 'localhost',
    port: parseInt(configData.DB_PORT) || 5432,
    username: configData.USERNAME,
    password: configData.PASSWORD,
    database: configData.DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/**/migrations/*.js'],
    migrationsTableName: 'migrations',
    synchronize: true,
    migrationsRun: false
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;