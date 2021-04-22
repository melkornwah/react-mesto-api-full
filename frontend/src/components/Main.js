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
        {
          Array.isArray(props.cards) ?
          props.cards.map((card, i) => (
            <Card
              item={card}
              key={i}
              setCurrentCard={props.setCurrentCard}
              onImageClick={props.onCardClick}
              onLikeClick={props.onCardLike}
              onDeleteClick={props.onCardDelete}
            />
          ))
          :
          console.log("Карточек пока что нет.")
        }
        </ul>
      </section>
    </main>
  );
};

export default Main;