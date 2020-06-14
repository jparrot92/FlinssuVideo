import React from 'react';
import '../assets/styles/App.scss';

const Header = () => (
  <header className='header'>
    <img className='header__img' src='../assets/logo-flinssuu-video-BW2.png' alt='Flinssuu Video' />
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img src='../assets/user-icon.png' alt='' />
        <p>Perfil</p>
      </div>
      <ul>
        <li><a href='/'>Cuenta</a></li>
        <li><a href='/'>Cerrar Sesión</a></li>
      </ul>
    </div>
  </header>
);

export default Header;
