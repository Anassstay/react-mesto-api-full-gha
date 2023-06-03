import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
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
        <button className="auth__submit-button" type="submit">Войти</button>
      </form>
    </section>
  );
};

export default Login;