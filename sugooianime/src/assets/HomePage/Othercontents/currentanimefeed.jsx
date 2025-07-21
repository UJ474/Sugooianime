import React, { useState, useEffect, useRef } from 'react';
import AnimeCard from '../../components/animecard';
import '../../css_files/spinner.css';
import './homepageother.css';

const CurrentAnimeFeed = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentStoredData = localStorage.getItem('currentanimesdata');
        if (currentStoredData) {
            const parsedData = JSON.parse(currentStoredData);
            const now = new Date().getTime();
            const oneday = 24 * 60 * 60 * 1000;

            if (now - parsedData.timestamp < oneday) {
                setAnimeList(parsedData.data);
                setLoading(false);
                return;
            }
        }
        fetchAndStoreCurrentAnime();
    }, []);

    function fetchAndStoreCurrentAnime() {
        setLoading(true);
        fetch('https://api.jikan.moe/v4/seasons/now?page=1')
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.length > 0) {
                    const top30 = data.data.slice(0, 20).map(anime => ({
                        title: anime.title,
                        title_english: anime.title_english,
                        score: anime.score,
                        imageUrl: anime.images.jpg.large_image_url,
                        url: anime.url,
                        synopsis: anime.synopsis,
                        genres: anime.genres,
                        title_japanese: anime.title_japanese,
                        aniimages: anime.images,
                        themes: anime.themes,
                        episodes: anime.episodes,
                    }));
                    setAnimeList(top30);
                    localStorage.setItem('currentanimesdata', JSON.stringify({
                        data: top30,
                        timestamp: new Date().getTime()
                    }));
                }
            })
            .catch(error => {
                console.log("Error fetching current anime:", error);
            })
            .finally(() => setLoading(false));
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
            <h2 className="fancyheading" style={{ textAlign: 'left', paddingLeft: '20px' }}>Currently Airing</h2>
            <div className="animescroll">
                {animeList.slice(0, 10).map((anime, index) => (
                    <div key={index} style={{ flex: '0 0 auto', marginRight: '10px' }}>
                        <AnimeCard
                            title={anime.title}
                            imageUrl={anime.imageUrl}
                            synopsis={anime.synopsis ?? "No synopsis available"}
                            rating={anime.score ?? "N/A"}                        
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CurrentAnimeFeed;