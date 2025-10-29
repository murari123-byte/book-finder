import React from "react";


function BookCard({ book, isFavorite, toggleFavorite }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author_name?.[0] || "Unknown Author"}</p>
      <p className="year">{book.first_publish_year || "N/A"}</p>
      <button onClick={() => toggleFavorite(book)}>
        {isFavorite ? " Remove" : " Favorite"}
      </button>
    </div>
  );
}

export default BookCard;
