//#region Imports

import { setupRankingRoutes } from './api/ranking';
import { getDatabaseConnection } from './typeorm';

//#endregion

const app = require('./app');

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

(async () => {
  const connection = await getDatabaseConnection();

  setupRankingRoutes(app, connection);
})().catch((error) => {
  console.log(error);

  server.close();
});
