import PopupWithForm from "./PopupWithForm";
import React from "react";

function DeleteCardPopup(props) {
  function handleCardDelete(evt) {
    evt.preventDefault();

    props.onCardDelete();
  }

  return (
    <PopupWithForm 
      type="confirm" 
      name="confirmation" 
      title="Вы уверены?" 
      button="Да" 
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleCardDelete}
      onEscPress={props.onEscPress}
    />
  )
}

export default DeleteCardPopup;