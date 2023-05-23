import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from '../utils/api';
import auth from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRouteElement from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

 // статус входа
  const [loggedIn, setLoggedIn] = useState(false);
  // email
  const [userEmail, setUserEmail] = useState("");
  // попап входа
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    // попап входа
  const [isInfoTolltipSuccess, setIsInfoTolltipSuccess] = useState(false);
    // хук 
  const navigate = useNavigate();

    // получить массив карточек и инфу юзера
  useEffect(() => {
    loggedIn &&
    Promise.all([api.getInitialData(), api.getUserInfo()])
    .then(([initialData, userData]) => {
      setCurrentUser(userData);
      setCards(initialData);
    })
    .catch(err => console.log(err))
  }, [loggedIn]);
  
  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSuccessPopupOpen(false);
    setSelectedCard(null);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c));
      })
     .catch(err => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => 
          state.filter((item) => item._id !== card._id));
          closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleUpdateAvatar(userData) {
    api.setUserAvatar(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleAddPlaceSubmit(name, link) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // регистрация
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsInfoTolltipSuccess(true);// успешный вход
        navigate('/sign-in', { replace: true });// перебросить на вход
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);// фейл  
        console.log(err);
      })
      .finally(() => setIsSuccessPopupOpen(true));// открыть попап
  }

  // аутентификация(вход)
  function handleAutorize(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      setUserEmail(email);// передать почту
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);// войдено
      navigate('/', { replace: true });// перебросить в профиль
    })
    .catch((err) => {
      setIsInfoTolltipSuccess(false);// фейл
      setIsSuccessPopupOpen(true);// открыть попап
      console.log(err);
    });
  }

 // проверить токен
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);// войти
            setUserEmail(res.data.email);// получить почту
            navigate('/', { replace: true });// перебросить в профиль
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  // удалить токен
  const handleSignOut = () => {
    setLoggedIn(false);// не вошли
    localStorage.removeItem('jwt');
    setUserEmail("");// очистить почту
    navigate('/sign-in', { replace: true });// перебросить на вход
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
  
      <Header
        onSignOut={handleSignOut}
        email={userEmail}
      />
    
      <Routes>
        <Route path="/sign-in"
          element={
            <>
            <Login onLogin={handleAutorize}/>
            </>
          }
        />
        <Route path="/sign-up"
          element={
            <>
            <Register onRegister={handleRegister} />
            </>
          }
        />
        <Route path="/"
          element={
            <>
            <ProtectedRouteElement
              loggedIn={setLoggedIn}
              component={Main}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
            />
            <Footer />
            </>
          } 
        />
      </Routes>

      {/* {Popup для редактирования информации} */}
      <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onSubmit={handleUpdateUser}
        />

      {/* {Popup для добавления карточек} */}
      <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onSubmit={handleAddPlaceSubmit}
        />

      {/* {Popup для удаления карточки} */}
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
      />

      {/* {Popup для обновления аватара} */}
      <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

      {/* {Popup для открытия фото} */}
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isSuccessPopupOpen}
        isSuccess={isInfoTolltipSuccess}
      />

    </CurrentUserContext.Provider>
    </div>
  )
};

export default App;