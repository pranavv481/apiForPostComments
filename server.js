const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = 5000;
require('./db');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(bodyParser.json());
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use(morgan());

// Not Found Route
app.use((req, res, next) => {
  req.status = 404;
  const error = new Error('Routes Not Found');
  next(error);
});

//error handler
if (app.get('env') === 'production') {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message,
    });
  });
}

app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, (req, res) => {
  console.log('server start on port' + port);
});
