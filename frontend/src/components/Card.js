import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <div className="cards">
      {isOwn && ( <button className="cards__delete-button" type="button" aria-label="Удалить" onClick={handleDeleteClick}></button> )}
      <img className="cards__image" alt={card.name || ''} src={card.link || ''}  onClick={handleClick}/>
      <div className="cards__container">
        <h2 className="cards__title">{card.name || ''}</h2>
        <div className="cards__likes">
          <button className={`cards__like ${isLiked && 'cards__like_active'}`} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
          <p className="cards__like-number">{card.likes.length}</p>
        </div>     
      </div>
    </div>
   )
};

export default Card;