import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_photo ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <div className="popup__image-content">
          <img className="popup__image" src={card?.link || ''} alt={card?.name || ''}/>
          <p className="popup__image-text">{card?.name || ''}</p>
        </div>
        <button className="popup__close-button" type="reset" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </section>
  )
};

export default ImagePopup;