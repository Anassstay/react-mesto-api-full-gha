import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      >
      <input
        className="popup__input popup__input_change-avatar"
        type="url"
        id="avatar-input"
        name="avatar"
        required
        placeholder="Ссылка на новый аватар"
        ref={avatarRef}
      />
      <span className="popup__input-error" id='avatar-input-error'/>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;