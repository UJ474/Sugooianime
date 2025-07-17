import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './genresection.css';


const genreList = [

  'Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons',
  'Drama', 'Ecchi', 'Fantasy', 'Game', 'Harem', 'Historical',
  'Horror', 'Isekai', 'Josei', 'Kids', 'Magic', 'Martial Arts',
  'Mecha', 'Military', 'Music', 'Mystery', 'Parody', 'Police',
  'Psychological', 'Romance', 'Samurai', 'School', 'Sci-Fi', 'Seinen',
  'Shoujo', 'Shounen', 'Slice of Life',
  'Space', 'Sports', 'Super Power', 'Supernatural', 'Thriller',
  'Vampire',
];



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
    <div className="genre-section-container">
      <h2 className="genre-title">Genres</h2>
      <div className="genre-grid">
        {genreList.map((genre, index) => (
          <Link to="" className="genre-link" key={index}>
            {genre}
          </Link>
        ))}
      </div>
      <div className="show-more-container">
        <button className="show-more-btn">Show more</button>
      </div>
    </div>
  );
}