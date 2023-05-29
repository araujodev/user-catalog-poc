import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: __dirname + '/../user-catalog.db',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [],
  subscribers: [],
});
