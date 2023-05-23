import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        id="name-input"
        name="name"
        minLength="2"
        maxLength="40" 
        required
        placeholder="Имя"
        value={name || ""}
        onChange={(e) => {setName(e.target.value)}}
      />
      <span className="popup__input-error" id="name-input-error"/>
      <input
        className="popup__input popup__input_type_info"
        type="text"
        id="info-input"
        name="info"
        minLength="2"
        maxLength="200"
        required
        placeholder="О себе"
        value={description || ""}
        onChange={(e) => {setDescription(e.target.value)}}
      />
      <span className="popup__input-error" id="info-input-error"/>
    </PopupWithForm>
  )
};

export default EditProfilePopup;