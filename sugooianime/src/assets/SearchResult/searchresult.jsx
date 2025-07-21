import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimeCard from '../components/animecard.jsx';
import './searchresult.css';
import'../css_files/spinner.css';

function capitalizeQuery(str) {
  return str
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export default function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!query) return;
  setLoading(true);

  const formattedQuery = capitalizeQuery(query);
  fetch(`https://api.jikan.moe/v4/anime?q=${formattedQuery}&limit=30`)
    .then(res => res.json())
    .then(data => {
      setResults(data.data || []);
      setLoading(false);
    })
    .catch(err => {
      console.error("Search error:", err);
      setLoading(false);
    });
}, [query]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Search results for: <em>{query}</em></h2>

      {loading ? (
        <div className="spinner"></div>
      ) : results.length === 0 ? (
        <p style={{ color: 'white' }}>No results found</p>
      ) : (
        <div className="filteredanimecontainer">
          {results.map(anime => (
            <AnimeCard
              key={anime.mal_id}
              title={anime.title_english || anime.title}
              imageUrl={anime.images.jpg.large_image_url}
              synopsis={anime.synopsis}
              rating={anime.score}
            />
          ))}
        </div>
      )}
    </div>
  );
}