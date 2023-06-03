// создать express router
const userRouter = require('express').Router();

// импорт списков
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar
} = require('../controllers/users');

const {
  idUserValidator,
  dataUserValidator,
  avatarUserValidator,
} = require('./validators/userValidator');

userRouter.get('/', getUsers);

userRouter.get('/me', getUserInfo);

userRouter.patch('/me', dataUserValidator, updateUserInfo);

userRouter.get('/:userId', idUserValidator, getUserById);

userRouter.patch('/me/avatar', avatarUserValidator, updateUserAvatar);

// экспорт express router
module.exports = userRouter;
