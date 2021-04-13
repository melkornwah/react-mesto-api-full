import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [placeValue, setPlaceValue] = React.useState("");
  const [urlValue, setUrlValue] = React.useState("");

  function handlePlaceChange(evt) {
    setPlaceValue(evt.target.value);
  }

  function handleUrlChange(evt) {
    setUrlValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onCreateCard({
      name: placeValue,
      link: urlValue
    });

    setPlaceValue("");
    setUrlValue("");
  }

  return (
    <PopupWithForm 
      type="form" 
      name="place" 
      title="Новое место" 
      button="Добавить" 
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
          id="place-input" 
          placeholder="Название" 
          minLength="2" 
          maxLength="40" 
          required
          value={placeValue}
          onChange={handlePlaceChange}
        />
        <span 
          className="popup__input-error" 
          id="place-input-error"
        >
        </span>
        <input 
          type="url" 
          name="link" 
          className="popup__input" 
          id="link-input" 
          placeholder="Ссылка на картинку" 
          required
          value={urlValue}
          onChange={handleUrlChange}
        />
        <span 
          className="popup__input-error" 
          id="link-input-error"
        >
        </span>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
