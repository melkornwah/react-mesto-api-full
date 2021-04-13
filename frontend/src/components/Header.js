import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
  return(
    <>
    {
      props.isLoggedIn ?
        <header className="header header_is-logged-in">
          <img src={logo} alt="Логотип" className="header__logo" />
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li className="header__menu-item">
                <p className="header__user-email">
                  {props.userMail}
                </p>
              </li>
              <li className="header__menu-item">
                <button 
                  className="button header__button"
                  onClick={props.onLogOut}
                >
                  Выход
                </button>
              </li>
            </ul>
          </nav>
        </header>
      :
        <header className="header">
          <img src={logo} alt="Логотип" className="header__logo" />
            <button 
              className="button header__button header__button_logged-out"
              onClick={props.onRedirectionClick}
            >
              {props.redirection}
            </button>
        </header>
      }
    </>
  );
};

export default Header;