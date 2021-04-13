import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function EditProfilePopup(props) {
  const [nameValue, setNameValue] = React.useState("");
  const [aboutValue, setAboutValue] = React.useState("");

  const user = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setNameValue(evt.target.value);
  }

  function handleAboutChange(evt) {
    setAboutValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  
    props.onUpdateUser({
      name: nameValue,
      job: aboutValue
    });

    setNameValue("");
    setAboutValue("");
  }

  React.useEffect(() => {
    setNameValue(user.name || "");
    setAboutValue(user.about || "");
  }, [user]);

  return (
    <PopupWithForm 
      type="form" 
      name="profile" 
      title="Редактировать профиль" 
      button="Сохранить" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit}
      onEscPress={props.onEscPress}
    >
      <>
        <input 
          type="text" 
          name="name" 
          className="popup__input" 
          id="name-input" 
          placeholder="Ваше имя" 
          minLength="2" 
          maxLength="40" 
          required 
          value={nameValue}
          onChange={handleNameChange}
        />
        <span 
          className="popup__input-error" 
          id="name-input-error" 
        >
        </span>
        <input 
          type="text" 
          name="job" 
          className="popup__input" 
          id="job-input" 
          placeholder="Ваш род деятельности" 
          minLength="2" 
          maxLength="200" 
          required 
          value={aboutValue}
          onChange={handleAboutChange}
        />
        <span 
          className="popup__input-error" 
          id="job-input-error" 
        >
        </span>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;