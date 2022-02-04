const express = require('express');
const config = require('./config/config');
const entityRouter = require('./routers/entityRouter');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();


dbUrl = config.dbUrl
connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbUrl , connectOptions)
                .catch(console.error);
console.log('Mongoose connected on app creation');
app.use(morgan('dev'))
app.use('', entityRouter);

app.listen(config.port, () => {
  console.log(`Steakhouse-webapp is listening on port ${config.port}`)
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
