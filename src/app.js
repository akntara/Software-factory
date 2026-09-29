const express = require('express');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const { AppError } = require('./errors');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);

app.use((req, res, next) => {
  next(new AppError(404, 'Route not found'));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = Number.isInteger(error.status)
    ? error.status
    : Number.isInteger(error.statusCode) && error.statusCode >= 400
      ? error.statusCode
      : 500;
  const message = status === 500 ? 'Internal server error' : error.message;
  return res.status(status).json({
    success: false,
    error: { message }
  });
});

module.exports = app;
