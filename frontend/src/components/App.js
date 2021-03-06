import React from "react";
import { Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import success from "../images/success.png";
import failure from "../images/failure.png";
import api from "../utils/api";
import { CurrentUserContext} from "../contexts/CurrentUserContext";
import SignUp from "./Register";
import SignIn from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, authenticate } from "../utils/authMesto";

function App() {  
  const history = useHistory();
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);
  const [isEditProfilePopupOpen, setProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupState] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupState] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({item: {}, isOpen: false});
  const [currentCard, setCurrentCard] = React.useState({});
  const [user, setUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [token, setTokenValue] = React.useState("");
  const [isLoggedIn, setLoggedInState] = React.useState(false);
  const [isSuccesfullAuth, setSuccessfullAuthState] = React.useState(false);
  const [redirection, setRedirection] = React.useState("Вход");
  const [currentAuth, setCurrentAuth] = React.useState("signup");
  const [currentAuthType, setCurrentAuthType] = React.useState("Вы успешно зарегистрировались!");
  const [currentMail, setCurrentMail] = React.useState("");

  function handleEditAvatarClick() {
    setAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setPlacePopupState(true);
  }

  function handleInfoTooltipRender() {
    setInfoTooltipState(true);
  }
  
  function closeAllPopups() {
    setAvatarPopupState(false);
    setProfilePopupState(false);
    setPlacePopupState(false);
    setDeleteCardPopupState(false);
    setInfoTooltipState(false);
    setSelectedCard({item: {}, isOpen: false});
  }

  function handleEscKeyClose(evt) {
    if (evt.key === "ESC") {
      closeAllPopups();
    }
  }

  function handleRedirection() {
    if (currentAuth === "signup") {
      history.push("/signin");
      setRedirection("Регистрация");
      setCurrentAuth("signin");
      setCurrentAuthType("Вы успешно авторизировались!");
    } else if (currentAuth === "signin") {
      history.push("/signup");
      setRedirection("Вход");
      setCurrentAuth("signup");
      setCurrentAuthType("Вы успешно зарегистрировались!");
    }
  }

  function handleCardClick(card) {
    setSelectedCard({item: card, isOpen: true});
  }

  function handleUpdateUser(formData) {
    api.updateUserInfo(formData)
      .then(data => {
        setUser(data.data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(formData) {
    api.patchAvatar(formData)
      .then(data => {
        setUser(data.data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCreateCard(formData) {
    api.postCard(formData)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardDeleteClick(card) {
    api.deleteCard(card)
    .then(() => {
      const newCards = cards.filter((c) => {
        return !(c._id === card._id);
      });
      setCards(newCards);
      
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    })
  }

  function handleCardDelete() {
    setDeleteCardPopupState(true);
  }

  function handleCardLike(card) {
    const data = card;

    const isLiked = (data&& data.likes && data.likes.length !== 0) ? data.likes.some(i => i === user._id) : false;

    api.changeLikeCardStatus(data, isLiked)
      .then((newCard) => {
        const newCards = cards.map(
          (c) => c._id === data._id ? newCard.data : c
        );
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleRegister(data, token) {
    register(data)
      .then(res => {
        if(!(res === undefined)){
          setSuccessfullAuthState(true);
          handleInfoTooltipRender();
          setCurrentMail(data.email);
          setLoggedInState(true);
        } else {
          setSuccessfullAuthState(false);
          handleInfoTooltipRender();
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleLogIn(data, token) {
    authorize(data)
      .then(res => {
        if(!(res === undefined)) {
          setSuccessfullAuthState(true);
          handleInfoTooltipRender();
          setCurrentMail(data.email);
          setLoggedInState(true);
        } else {
          setSuccessfullAuthState(false);
          handleInfoTooltipRender();
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  function changeToken(value) {
    setTokenValue(`${token}`);
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedInState(false);

    history.push("/signup");
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      authenticate(jwt)
        .then((res) => {
          setLoggedInState(true);
          setCurrentMail(res.data.email);

          history.push("/");
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  React.useEffect(() => {
    if (isLoggedIn === true) {
      api.getUserInfo()
      .then(data => {
        setUser(data.data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      api.loadInitialCards()
      .then(items => {
        setCards(items.data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="App">
        <div className="page">
          <Header 
            redirection={redirection}
            onRedirectionClick={handleRedirection}
            isLoggedIn={isLoggedIn}
            userMail={currentMail}
            onLogOut={handleLogOut}
          />
          <ProtectedRoute 
            path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            setCurrentCard={setCurrentCard}
            userInfo={user}
          />
          <Route path={"/signup"}>
            <SignUp
              onRedirectionClick={handleRedirection}
              onSubmit={handleRegister}
              token={changeToken}
            />
          </Route>
          <Route path={"/signin"}>
            <SignIn 
              onSubmit={handleLogIn}
              token={changeToken}
            />
          </Route>
          <Footer />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            onEscPress={handleEscKeyClose}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onEscPress={handleEscKeyClose}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onCreateCard={handleCreateCard}
            onEscPress={handleEscKeyClose}
          />
          <DeleteCardPopup 
            isOpen={isDeleteCardPopupOpen}
            currentCard={currentCard}
            onCardDelete={handleCardDeleteClick}
            onClose={closeAllPopups}
            onEscPress={handleEscKeyClose}
          />
          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
            onEscPress={handleEscKeyClose}
          />
          <InfoTooltip
            type="auth"
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            onSuccess={success}
            onFailure={failure}
            isSuccessful={isSuccesfullAuth}
            onEscPress={handleEscKeyClose}
            currentAuthType={currentAuthType}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
