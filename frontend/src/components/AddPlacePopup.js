import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <input
        className="popup__input popup__input_add_name"
        type="text"
        id="place-input"
        name="name"
        minLength="2"
        maxLength="30"
        required
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}      
        />
      <span className="popup__input-error" id="place-input-error"/>
      <input
        className="popup__input popup__input_add_link" 
        type="url"
        id="url-input"
        name="link"
        required
        placeholder="Ссылка на картинку"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__input-error" id="url-input-error"/>
    </PopupWithForm>
  )
};

export default AddPlacePopup;