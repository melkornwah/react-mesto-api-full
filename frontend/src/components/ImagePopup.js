function ImagePopup(props) {
  return(
    <div className="popup">
      <div className={props.card.isOpen ? "popup__image modal modal_is-opened" : "popup__image modal"} >
        <div className="image-container">
          <img src={props.card.item.link} alt={props.card.item.name} className="image-container__photo" />
          <h2 className="image-container__title">{props.card.item.name}</h2>
          <button type="button" className="button button_action_close" aria-label="Закрыть" onClick={props.onClose} ></button>
        </div>
        <div className="popup__overlay" onClick={props.onClose} onKeyPress={props.onEscPress}></div>
      </div>
    </div>
  );
};

export default ImagePopup;