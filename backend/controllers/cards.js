const { ValidationError, DocumentNotFoundError, CastError } = require('mongoose').Error;

const Card = require('../models/card');

const { CREATED } = require('../utils/errCode');

const NotFoundError = require('../utils/notFoundError');
const BadRequestError = require('../utils/badRequestError');
const ForbiddenError = require('../utils/forbiddenError');

// возвращаем все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ cards }))
    .catch(next);
};

// создать карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED).send({ card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        const errMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Переданы некорректные данные при создании ${errMessage}`));
      } else {
        next(err);
      }
    });
};

// удалить карточку
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      const owner = card.owner.toString();
      if (req.user._id === owner) {
        card.deleteOne()
          .then(() => res.send({ message: 'Карточка успешно удалена' }))
          .catch(next);
      } else {
        next(new ForbiddenError('Нет прав для удаления карточки'));
      }
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Объект с указанным id не найден'));
      } else if (err instanceof CastError) {
        next(new BadRequestError(`Передан несуществующий id: ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};

// поставить лайк
const likeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`Объект с указанным id не найден: ${req.params.cardId}`));
      } else if (err instanceof CastError) {
        next(new BadRequestError(`Передан несуществующий id: ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};

// убрать лайк
const dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`Объект с указанным id не найден: ${req.params.cardId}`));
      } else if (err instanceof CastError) {
        next(new BadRequestError(`Передан несуществующий id: ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
