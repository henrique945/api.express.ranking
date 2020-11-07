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

    }

  return connection;
}
