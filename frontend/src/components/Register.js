import React from "react";

function SignIn(props) {
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  function handleEmailChange(evt) {
    setEmailValue(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPasswordValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({
      email: emailValue,
      password: passwordValue
    });
  }

  return(
    <div className="login">
      <h2 className="login__heading">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="login__input-container">
          <input 
            className="login__input"
            id="email"
            name="email"
            type="email"
            value={emailValue}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input 
            className="login__input"
            id="password"
            name="password"
            type="password"
            value={passwordValue}
            onChange={handlePasswordChange}
            placeholder="Пароль"
          />
        </fieldset>
        <div className="login__button-container">
          <button
            className="button button_action_auth"
          >
            Зарегистрироваться
          </button>
          <button 
            className="button button_action_redirect"
            onClick={props.onRedirectionClick}
          >
            Уже зарегистрированы? Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;