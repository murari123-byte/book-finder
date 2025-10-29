import React from "react";


function Favorites({ favorites, toggleFavorite }) {
  if (favorites.length === 0) return null;

  return (
    <div className="favorites">
      <h2> Favorites</h2>
      <div className="favorites-grid">
        {favorites.map((book) => {
          const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
            : "https://via.placeholder.com/80x120?text=No+Cover";
          return (
            <div key={book.key} className="favorite-item">
              <img src={coverUrl} alt={book.title} />
              <p>{book.title}</p>
              <button onClick={() => toggleFavorite(book)}>Remove</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
