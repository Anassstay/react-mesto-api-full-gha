const router = require('express').Router();

const cardRouter = require('./cards');
const userRouter = require('./users');

const NotFoundError = require('../utils/notFoundError');

router.use(cardRouter);
router.use(userRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
