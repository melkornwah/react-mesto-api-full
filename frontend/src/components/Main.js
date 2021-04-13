import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Main(props) {  
  const user = React.useContext(CurrentUserContext);
  
  return(
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <button 
            className="button button_action_edit-photo" 
            onClick={props.onEditAvatar}
          >
            <div className="profile__photo-edit" />
            <div className="profile__photo" style={{
              backgroundImage: `url(${user.avatar})`
            }} />
          </button>
          <div className="profile__info">
            <div className="profile__header">
              <h1 className="profile__name">{user.name}</h1>
              <button 
                type="button" 
                className="button button_action_edit" 
                aria-label="Редактировать" 
                onClick={props.onEditProfile}
              >
              </button>
            </div>
            <p 
              className="profile__desc"
            >
              {user.about}
            </p>
          </div>
        </div>
        <button 
          type="button" 
          className="button button_action_add" 
          aria-label="Добавить" 
          onClick={props.onAddPlace}
        >
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map(card => (
            <Card
              item={card}
              key={card._id}
              onImageClick={props.onCardClick}
              onLikeClick={props.onCardLike}
              onDeleteClick={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;