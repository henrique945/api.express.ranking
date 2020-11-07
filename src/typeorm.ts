//#region Imports

import { Connection, createConnection } from 'typeorm';
import { RankingEntity } from './api/entities/ranking.entity';

//#endregion

/**
 * Método que criar uma conexão com o banco de dados
 */
export async function getDatabaseConnection(): Promise<Connection> {
  console.log('Inicializando banco de dados...');

  let connection: any;
  if (process.env.DB_TYPE === 'sqlite') {
    // @ts-ignore
    connection = await createConnection({
      type: 'sqlite',
      database: './example.db',
      synchronize: true,
      migrations: false,
      logger: 'advanced-console',
      entities: [
        RankingEntity,
      ],
      logging: true,
    });
  } else
    if (process.env.DB_TYPE === 'postgress') {
      // @ts-ignore
      connection = await createConnection({
        type: 'postgres',
        database: process.env.DB_DATABASE,
        synchronize: false,
        migrationsRun: true,
        logger: 'advanced-console',
        entities: [
          RankingEntity,
        ],
        migrations: [
          __dirname + '/migrations/**/*{.ts,.js}',
        ],
        logging: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        keepConnectionAlive: true,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        acquireTimeout: process.env.DB_TIMEOUT,
        extra: {
          ssl: false,
        },
      });
    }

  return connection;
}
