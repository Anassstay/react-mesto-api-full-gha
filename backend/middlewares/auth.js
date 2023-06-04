const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/unauthorizedError');

const JWT_SECRET = require('../utils/config');

const JWT_SECRET_PROD = process.env.REACT_APP_JWT_SECRET;
const { NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  // верифицировать токен
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  // записать пейлоуд в объект запроса
  req.user = payload;
  // пропустить запрос дальше
  return next();
};
