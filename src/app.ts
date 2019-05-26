import express from 'express';
import readRoutes from './read';
import writeRoutes from './write';
var bodyParser = require('body-parser');

const port = 58304;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

for (const route of Object.keys(readRoutes)) {
  app.use('/api' + route, readRoutes[route]);
}

for (const route of Object.keys(writeRoutes)) {
  app.use('/api' + route, writeRoutes[route]);
}

app.listen(port, () => console.log(`listening on port ${port}!`));
