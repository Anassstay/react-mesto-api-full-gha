import React from 'react';

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
  return (
    <section className={`popup popup__${name} ${isOpen ? "popup_opened" : ""}`}>
    <div className="popup__container">
      <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
      <form className={`popup__form popup__content popup__content_${name}`} name={`${name}`} onSubmit={onSubmit}>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__button popup__save-button" type="submit" aria-label="Добавить изменения">{buttonText || 'Сохранить'}</button>
      </form>
    </div>
  </section>
  )
};

export default PopupWithForm;