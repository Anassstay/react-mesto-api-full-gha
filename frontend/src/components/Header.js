import React from 'react';
import headerLogo from '../images/header-logo.svg';
import NavBar from './Navbar';

function Header({ email, isOpen, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={headerLogo}/>
      <NavBar 
        email={email}
        isOpen={isOpen}
        onSignOut={onSignOut}
      />
    </header>
  )
};

export default Header;