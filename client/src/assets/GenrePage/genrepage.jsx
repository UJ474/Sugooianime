import React from 'react';
import './genrepage.css';
import { useEffect, useState } from 'react';
import GenreSearch from './genresearch';


const GenrePage = () => {
  const genres = [
    "Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi",
    "Fantasy", "Game", "Harem", "Historical", "Horror", "Isekai", "Josei", "Kids",
    "Martial Arts", "Mecha", "Military", "Music", "Mystery", "Parody", "Police",
    "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo",
    "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life", "Space", "Sports",
    "Super Power", "Supernatural", "Thriller", "Vampire"
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
    setShowFiltered(false);
  };

  const handleFilter = () => {
    setShowFiltered(true);
  };

  return (
    <div className="genre-page-container">
      <div className="breadcrumb">
        <span>Home</span> <span>•</span> <span className="breadcrumb-current">Filter</span>
      </div>
      <div className="filter-box">
        <h2 className="filter-title">Filter</h2>

        <div className="genre-section">
          <div className="genre-list">
            {genres.map((genre, index) => (
              <span
                className={`genre-tag ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                key={index}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="filter-button-container">
          <button className="filter-button" onClick={handleFilter}>Filter</button>
        </div>
      </div>

      {showFiltered && selectedGenres.length > 0 && (
        <GenreSearch selectedGenre={selectedGenres} />
      )}
    </div>
  );
};

export default GenrePage;