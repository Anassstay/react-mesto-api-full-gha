const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { PRODUCTION, DEV_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  // верифицировать токен
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === PRODUCTION ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  // записать пейлоуд в объект запроса
  req.user = payload;
  // пропустить запрос дальше
  return next();
};
