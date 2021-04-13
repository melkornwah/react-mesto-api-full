import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const [urlValue, setUrlValue] = React.useState("");

  function handleUrlChange(evt) {
    setUrlValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      link: urlValue
    })

    setUrlValue("");
  }

  return (
    <PopupWithForm 
      type="form" 
      name="profile-photo" 
      title="Обновить аватар" 
      button="Сохранить" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit}
      onEscPress={props.onEscPress}
    >
      <>
        <input 
          type="url" 
          name="link" 
          className="popup__input" 
          id="url-input" 
          placeholder="Ссылка на картинку" 
          required
          value={urlValue}
          onChange={handleUrlChange}
        />
        <span 
          className="popup__input-error" 
          id="url-input-error"
        >
        </span>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
