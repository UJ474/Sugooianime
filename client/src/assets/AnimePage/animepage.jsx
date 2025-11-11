import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './animepage.css';
import '../css_files/spinner.css';
import CurrentAnimeFeed from '../HomePage/Othercontents/currentanimefeed';
import SuggestedAnimeFeed from '../HomePage/Othercontents/suggestedanimefeed';

const AnimePage = () => {
  const { animeId } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!animeId) return;

    console.log("Fetching anime with title:", animeId);
    setLoading(true);
    fetch(`https://api.jikan.moe/v4/anime?q=${animeId}`)
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          setAnimeData(data.data[0]);
        } else {
          console.error("No anime found for:", animeId);
        }
      })
      .catch(err => console.error("Failed to fetch anime details:", err))
      .finally(() => {
        setLoading(false);
      });
  }, [animeId]);

  if (loading) {
    return (
      <div className="animepagecontainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!animeData) return <div className="animepagecontainer">No data available.</div>;

  return (
    <div className="animepagecontainer">
      <div className="animecontentwrapper">
        <div className="animeimagesection">
          <img
            src={animeData.images.jpg.large_image_url}
            alt={animeData.title}
            className="animecoverimage"
          />
        </div>
        <div className="animedetailssection">
          <h1 className="animetitle">{animeData.title}</h1>
          <div className="animeinfotags">
            <span className="ratingtag">{animeData.rating}</span>
            <span>TV</span>
            <span>{animeData.duration}</span>
          </div>
          {/* <div>
            <button className="watchbutton">▶ Watch now</button>
            <button className="addlistbutton">+ Add to List</button>
          </div> */}
          <p className="animesynopsis">{animeData.synopsis}</p>
        </div>
        <div className="animeinforight">
          <p><strong>Japanese:</strong> {animeData.title_japanese}</p>
          <p><strong>Aired:</strong> {animeData.aired.string}</p>
          <p><strong>Premiered:</strong> {animeData.season} {animeData.year}</p>
          <p><strong>Duration:</strong> {animeData.duration}</p>
          <p><strong>Status:</strong> {animeData.status}</p>
          <p><strong>MAL Score:</strong> {animeData.score}</p>
          <p><strong>Genres:</strong> {animeData.genres.map(g => g.name).join(', ')}</p>
          <hr />
          <p><strong>Studios:</strong> {animeData.studios.map(s => s.name).join(', ')}</p>
          <p><strong>Producers:</strong> {animeData.producers.map(p => p.name).join(', ')}</p>
        </div>
      </div>
      <div style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '6rem', padding: '4rem 1rem', borderTop: '1px solid #ccc' }}>
        <CurrentAnimeFeed />
      </div>
      <div style={{ overflowX: 'auto', maxWidth: '100%', padding: '0 1rem', borderTop: '1px solid #ccc' }}>
        <SuggestedAnimeFeed />
      </div>
    </div>
  );
};


export default AnimePage;