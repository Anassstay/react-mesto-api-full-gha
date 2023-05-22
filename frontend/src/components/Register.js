import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

const Register = ({ loggedIn, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          id="email-input"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="off"
        />
        <input
          className="auth__input"
          type="password"
          id="password-input"
          name="password"
          required
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="on"
        />
        <button className="auth__submit-button" type="submit">Зарегистрироваться</button>
        <Link to="./sing-in" className="auth__login-button">Уже зарегистрированы? Войти</Link>
      </form>
    </section>
  );
};

export default Register;