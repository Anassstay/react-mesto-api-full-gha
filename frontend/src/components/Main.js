import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ cards, onCardClick, onCardLike, onCardDelete, onEditProfile, onEditAvatar, onAddPlace }) {
  const currentUser = useContext(CurrentUserContext)
  return (
  <main className="content">
    <section className="profile">
      <div className="profile__info">
          <button className="profile__avatar-button" onClick={onEditAvatar}>
            <img className="profile__avatar" alt="Аватар" src={currentUser.avatar}/>
          </button>

        <div className="profile__text">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          <h2 className="profile__subtitle">{currentUser.about}</h2>
        </div>
      </div>
      <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
    </section>
    <section className="elements">
      {cards.map((card) => {
        return (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        )
      })}
    </section>
  </main>
  )
};

export default Main;