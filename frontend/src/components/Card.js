import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onImageClick(props.item);
  }

  function handleLikeClick() {
    props.onLikeClick(props.item);
  }

  function handleDeleteClick() {
    props.setCurrentCard(props.item);

    props.onDeleteClick(props.item);
  }

  const user = React.useContext(CurrentUserContext);

  const isLiked = (props.item && props.item.likes && props.item.likes.length !== 0) ? props.item.likes.some(i => i === user._id) : false;

  const isOwn = props.item.owner === user._id;

  return(
    <li className="element">
      <div 
        className="element__photo" 
        style={{
          backgroundImage: `url(${props.item.link})`
        }} 
        onClick={handleClick} 
      />
      <div className="element__desc">
        <h2 className="element__name">
          {props.item.name}
        </h2>
        <div className="element__likes">
          {isLiked ?
          <button
            type="button"
            className="button button_action_like button_action_like_active"
            aria-label="Понравилось" onClick={handleLikeClick}
          >
          </button>
          :
          <button
            type="button"
            className="button button_action_like"
            aria-label="Понравилось"
            onClick={handleLikeClick}
          >
          </button>}
          <p className="element__like-counter">
            {
              (props.item && props.item.likes && props.item.likes.length !== 0) ? props.item.likes.length : 0
            }
          </p>
        </div>
      </div>
      {isOwn && 
      <button 
        type="button" 
        className="button button_action_delete" 
        aria-label="Удалить" 
        onClick={handleDeleteClick}
      >
      </button>}
    </li>
  );    
}

export default Card;