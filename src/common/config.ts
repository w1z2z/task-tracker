import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import * as path from 'path';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): PostgresConnectionOptions {
    const masterOptions: PostgresConnectionCredentialsOptions = {
      host: process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost',
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    };

    return {
      type: 'postgres',
      ...masterOptions,
      entities: [path.join(__dirname, '..', '**', 'entities', '*.{js,ts}')],
      migrations: [
        path.join(__dirname, '..', 'database', 'migrations', '*.{js,ts}'),
      ],
      migrationsRun: false,
      synchronize: false,
    };
  }
}
