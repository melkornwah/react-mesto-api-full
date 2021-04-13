import React from "react";

function SignUp(props) {
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
      <h2 className="login__heading">Вход</h2>
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
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;