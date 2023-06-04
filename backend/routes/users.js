// создать express router
const router = require('express').Router();

const auth = require('../middlewares/auth');

// импорт списков
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  createUser,
  login
} = require('../controllers/users');

const {
  idUserValidator,
  dataUserValidator,
  avatarUserValidator,
  createUserValidator,
  loginUserValidator
} = require('./validators/userValidator');

router.post('/signin', loginUserValidator, login);

router.post('/signup', createUserValidator, createUser);

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getUserInfo);

router.patch('/users/me', auth, dataUserValidator, updateUserInfo);

router.get('/users/:userId', auth, idUserValidator, getUserById);

router.patch('/users/me/avatar', auth, avatarUserValidator, updateUserAvatar);

// экспорт express router
module.exports = router;
