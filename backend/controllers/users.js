const { ValidationError, CastError } = require('mongoose').Error;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { CREATED } = require('../utils/errCode');

const ConflictError = require('../utils/conflictError');
const NotFoundError = require('../utils/notFoundError');
const BadRequestError = require('../utils/badRequestError');
const UnauthorizedError = require('../utils/unauthorizedError');

const JWT_SECRET = require('../utils/config');

const JWT_SECRET_PROD = process.env.REACT_APP_JWT_SECRET;
const { NODE_ENV } = process.env;

// всех юзеров
const getUsers = (req, res, next) => {
  // Найти все записи
  User.find({})
    // записать данные в базу
    .then((users) => res.send(users))
    // если данные не записались
    .catch(next);
};

// по id
const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Объект с указанным id не найден: ${userId}`);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError(`Передан несуществующий id: ${userId}`));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.status(CREATED).send(data);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
        return;
      }
      if (err instanceof ValidationError) {
        const errMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(', ');
        next(new BadRequestError(`Переданы некорректные данные при создании пользователя: ${errMessage}`));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, dataUpdate, next) => {
  User.findByIdAndUpdate(req.user._id, dataUpdate, { new: true, runValidators: true })
    .orFail()

    .then((user) => {
      if (!user) {
        throw new NotFoundError('Объект с указанным id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        const errMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(', ');
        next(new BadRequestError(`Переданы некорректные данные при создании ${errMessage}`));
        return;
      }
      if (err instanceof CastError) {
        next(new BadRequestError(`Передан несуществующий id: ${req.user._id}`));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const dataUpdate = req.body;
  updateUser(req, res, dataUpdate, next);
};

const updateUserAvatar = (req, res, next) => {
  const dataUpdate = req.body;
  updateUser(req, res, dataUpdate, next);
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedError('Неправильный пароль или почта');
    }
    console.log(user);
    console.log(JWT_SECRET);
    // создать токен
    const token = jwt.sign(
      { _id: user._id },
      // NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET,
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log(token);
    res.cookie('jwt', token, {
      // такая кука будет храниться 7 дней
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      // защита от автоматической отправки кук
      // указать браузеру, чтобы тот посылал куки, только если запрос сделан с того же домена
      sameSite: 'none',
      // secure: false,
    });
    res.send({ message: 'Успешный вход' });
  } catch (err) { next(err); }
};

module.exports = {
  getUsers,
  getUserById,
  getUserInfo,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login
};
