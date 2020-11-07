const Express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

import bodyparser from 'body-parser';

require('dotenv').config();

const app = Express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'To viva!',
  });
});

module.exports = app;
