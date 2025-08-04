import React, { useState, useEffect } from "react";
import BookList from "../components/BookList";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const stored = localStorage.getItem("favorites"); 
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  if(!user) {
    return <Navigate to ="/account" replace state = {{from: "favorites"}}/>;
  }
  return (
    <div className="favorites-page">
      <h1>Избранные книги</h1>
      {favorites.length === 0 ? (
        <p>Нет избранных книг.</p>
      ) : (
        <BookList
          books={favorites}
          onBookClick={() => {}}
          onAddFavorite={() => {}}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export default Favorites;
