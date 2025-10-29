import React from "react";
import BookCard from "./BookCard";


function BookList({ books, favorites, toggleFavorite }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          isFavorite={favorites.some((fav) => fav.key === book.key)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default BookList;
