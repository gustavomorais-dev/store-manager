const express = require('express');
const routes = require('./routes');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(express.json());

// Routes
app.use('/', routes);

module.exports = app;
