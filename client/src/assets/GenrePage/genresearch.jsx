import React, { useState, useEffect } from 'react';
import AnimeCard from '../components/animecard.jsx';
import '../css_files/spinner.css';

const API_URL = 'https://api.jikan.moe/v4/anime';

const genreMap = {
  Action: 1,
  Adventure: 2,
  Cars: 3,
  Comedy: 4,
  Dementia: 5,
  Demons: 6,
  Drama: 8,
  Ecchi: 9,
  Fantasy: 10,
  Game: 11,
  Harem: 35,
  Historical: 13,
  Horror: 14,
  Isekai: 62,
  Josei: 43,
  Kids: 15,
  Magic: 16,
  "Martial Arts": 17,
  Mecha: 18,
  Military: 38,
  Music: 19,
  Mystery: 7,
  Parody: 20,
  Police: 39,
  Psychological: 40,
  Romance: 22,
  Samurai: 21,
  School: 23,
  "Sci-Fi": 24,
  Seinen: 42,
  Shoujo: 25,
  "Shoujo Ai": 26,
  Shounen: 27,
  "Shounen Ai": 28,
  "Slice of Life": 36,
  Space: 29,
  Sports: 30,
  "Super Power": 31,
  Supernatural: 37,
  Thriller: 41,
  Vampire: 32
};

const GenreSearch = ({ selectedGenre }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedGenre || selectedGenre.length === 0) return;

    const fetchAnimeByGenres = async () => {
      setLoading(true);
      try {
        const genreIds = selectedGenre.map(genre => genreMap[genre]).filter(Boolean);
        if (genreIds.length === 0) {
          setAnimeList([]);
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}?genres=${genreIds.join(',')}`);
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setAnimeList(data.data);
        } else {
          setAnimeList([]);
        }
      } catch (error) {
        setAnimeList([]);
      }
      setLoading(false);
    };

    fetchAnimeByGenres();
  }, [selectedGenre]);

  if (!selectedGenre || selectedGenre.length === 0) {
    return <div>Please select a genre.</div>;
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h2>Anime in Genres: {selectedGenre.join(', ')}</h2>
      <div className="filteredanimecontainer">
        {animeList.map(anime => (
          <AnimeCard
            key={anime.mal_id}
            title={anime.title_english || anime.title}
            imageUrl={anime.images.jpg.large_image_url}
            synopsis={anime.synopsis}
            rating={anime.score}
          />
        ))}
      </div>
    </div>
  );
};

export default GenreSearch;