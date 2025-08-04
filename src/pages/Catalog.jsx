import React, { useState, useEffect } from "react";
import BookList from "../components/BookList";
import ErrorMessage from "../components/ErrorMessage";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import BookModal from "../components/BookModal";
import { auth } from "../firebaseConfig";

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=javascript")
      .then((res) => res.json())
      .then((data) => {
        const first = data.docs.slice(0, 20);
        setBooks(first);
        setFilteredBooks(first);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [search, books]);

  const toggleFavorite = (book) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Сначала войдите в аккаунт, чтобы добавлять в избранное");
      return;
    }

    const exists = favorites.some((e) => e.key === book.key);
    let updated;
    if (exists) {
      updated = favorites.filter((e) => e.key !== book.key);
    } else {
      updated = [...favorites, book];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="catalog-page">
      <h1>Каталог книг</h1>
      <SearchBar search={search} setSearch={setSearch} />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <BookList
          books={filteredBooks}
          onBookClick={setSelectedBook}
          onAddFavorite={toggleFavorite}
          favorites={favorites}
        />
      )}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default Catalog;
