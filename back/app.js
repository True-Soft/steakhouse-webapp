const express = require('express');
const config = require('./config/config');
const entityRouter = require('./routers/entityRouter');
const morgan = require('morgan')

const app = express();


app.use(morgan('dev'))
app.use('', entityRouter);

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
});
