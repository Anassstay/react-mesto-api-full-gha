import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function NavBar({ email, onSignOut }) {
  return (
    <div className="header__navbar">
      <Routes>
        <Route exact path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          }
        />
        <Route exact path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">Войти</Link>
          }
        />
        <Route exact path="/"
          element={
            <>
              <p className="header__email">{email}</p>
              <button className="header__exit-button" type="button" onClick={onSignOut}>Выйти</button>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default NavBar;