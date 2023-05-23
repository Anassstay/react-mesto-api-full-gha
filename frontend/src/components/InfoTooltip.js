import React from 'react';
import ok from '../images/ok.svg';
import fail from '../images/fail.svg';

function InfoTooltip({ onClose, isOpen, isSuccess }) {
  return (
    <section className={`popup ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">

      <img
          className="popup__image-success"
          src={isSuccess ? ok : fail}
          alt="ok/fail"
        />
        
        <h2 className="popup__title popup__title-success">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </h2>

        <button
          className="popup__close-button"
          type="reset"
          onClick={onClose}
        />

      </div>
    </section>
  );
}

export default InfoTooltip;