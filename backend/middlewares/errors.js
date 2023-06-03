const { SERVER_ERROR } = require('../utils/errCode');

const errors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR
        ? 'Внутренняя ошибка сервера'
        : message,
    });
  next();
};

module.exports = errors;
