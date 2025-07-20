import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './genresection.css';


const genreList = [
  { name: 'Action', key: 'action' },
  { name: 'Adventure', key: 'adventure' },
  { name: 'Cars', key: 'cars' },
  { name: 'Comedy', key: 'comedy' },
  { name: 'Dementia', key: 'dementia' },
  { name: 'Demons', key: 'demons' },
  { name: 'Drama', key: 'drama' },
  { name: 'Ecchi', key: 'ecchi' },
  { name: 'Fantasy', key: 'fantasy' },
  { name: 'Game', key: 'game' },
  { name: 'Harem', key: 'harem' },
  { name: 'Historical', key: 'historical' },
  { name: 'Horror', key: 'horror' },
  { name: 'Isekai', key: 'isekai' },
  { name: 'Josei', key: 'josei' },
  { name: 'Kids', key: 'kids' },
  { name: 'Magic', key: 'magic' },
  { name: 'Martial Arts', key: 'martial_arts' },
  { name: 'Mecha', key: 'mecha' },
  { name: 'Military', key: 'military' },
  { name: 'Music', key: 'music' },
  { name: 'Mystery', key: 'mystery' },
  { name: 'Parody', key: 'parody' },
  { name: 'Police', key: 'police' },
  { name: 'Psychological', key: 'psychological' },
  { name: 'Romance', key: 'romance' },
  { name: 'Samurai', key: 'samurai' },
  { name: 'School', key: 'school' },
  { name: 'Sci-Fi', key: 'sci_fi' },
  { name: 'Seinen', key: 'seinen' },
  { name: 'Shoujo', key: 'shoujo' },
  { name: 'Shounen', key: 'shounen' },
  { name: 'Slice of Life', key: 'slice_of_life' },
  { name: 'Space', key: 'space' },
  { name: 'Sports', key: 'sports' },
  { name: 'Super Power', key: 'super_power' },
  { name: 'Supernatural', key: 'supernatural' },
  { name: 'Thriller', key: 'thriller' },
  { name: 'Vampire', key: 'vampire' },
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
    <div className="genresectioncontainer">
      <h2 className="genretitle" style={{ textAlign: 'center', fontSize: '4rem', fontWeight: '700', color: '#beb3ff', marginBottom: '1.5rem' }}>Genres</h2>
      <div className="genregrid">
        {genreList.map((genre, index) => (
          <Link
            to={`/genre/${genre.key}`}
            className="genrelink"
            key={index}
            state={{ genreKey: genre.key, genreName: genre.name }}
          >
          {genre.name}
        </Link>
        ))}
      </div>
      <div className="showmorecontainer">
        <Link to="/filter" className="showmorebtn">Show more</Link>
      </div>
    </div>
  );
}
