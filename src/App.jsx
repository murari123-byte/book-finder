import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import Favorites from "./components/Favorites";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchBooks = async (query) => {
    if (!query) return;
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 20)); // limit to 20 results
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (book) => {
    const isFav = favorites.some((fav) => fav.key === book.key);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.key !== book.key));
    } else {
      setFavorites([...favorites, book]);
    }
  };

  return (
    <div className="container">
      <h1> Book Finder</h1>
      <p className="subtitle">Search and save your favorite books!</p>

      <SearchBar onSearch={searchBooks} />

      {loading && <p className="status">Loading books...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && books.length > 0 && (
        <BookList
          books={books}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}

      <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
}

export default App;
