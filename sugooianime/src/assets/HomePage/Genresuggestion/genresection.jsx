import React, { useState, useEffect, useRef } from 'react';
import AnimeCard from '../../components/animecard';
import './genresection.css';


const genreMap = {
  Action: 1,
  Adventure: 2,
  Comedy: 4,
  Drama: 8,
  Fantasy: 10,
  Horror: 14,
  Mystery: 7,
  Romance: 22,
  SciFi: 24,
};

export default function GenreSection() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    if (!selectedGenre) return;

    fetch(`https://api.jikan.moe/v4/anime?genres=${selectedGenre}&order_by=popularity`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          const formatted = data.data.map(anime => ({
            title: anime.title_english || anime.title,
            imageUrl: anime.images?.jpg?.large_image_url,
            synopsis: anime.synopsis,
            rating: anime.score,
          }));
          setAnimeList(formatted);
        }
      })
      .catch(err => console.error('Error fetching genre anime:', err));
  }, [selectedGenre]);

  return (
    <div className="genre-container">
      <h2 className="genre-heading">Browse by Genre</h2>
      <div className="genre-buttons">
        {Object.entries(genreMap).map(([name, id]) => (
          <button
            key={id}
            className={`genre-btn ${selectedGenre === id ? 'active' : ''}`}
            onClick={() => setSelectedGenre(id)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="genre-anime-grid">
        {animeList.length > 0 ? (
          animeList.map((anime, idx) => (
            <AnimeCard
              key={idx}
              title={anime.title}
              imageUrl={anime.imageUrl}
              synopsis={anime.synopsis}
              rating={anime.rating}
            />
          ))
        ) : (
          selectedGenre && <p className="genre-loading">Loading anime...</p>
        )}
      </div>
    </div>
  );
}