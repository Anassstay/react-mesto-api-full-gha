// создать express router
const router = require('express').Router();

const auth = require('../middlewares/auth');

// импорт списков
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

const {
  cardDataValidator,
  cardIdValidator,
} = require('./validators/cardValidator');

router.get('/cards', auth, getCards);

router.post('/cards', auth, cardDataValidator, createCard);

router.delete('/cards/:cardId', auth, cardIdValidator, deleteCard);

router.put('/cards/:cardId/likes', auth, cardIdValidator, likeCard);

router.delete('/cards/:cardId/likes', auth, cardIdValidator, dislikeCard);

// экспорт express router
module.exports = router;
