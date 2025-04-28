import { useEffect, useState, useRef } from "react";
import trendingdata from "./trendingdata.jsx";
import SynopsisText from "./synopsistext.jsx";
import './trendinganime.css'

export default function TrendingAnime() {
    const [topAnime, setTopAnime] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const fetchRef = useRef(false);

    useEffect(() => {
        localStorage.removeItem('trendingAnime');
        const storedData = localStorage.getItem('trendingAnime');
    
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const now = new Date().getTime();
            const oneDay = 24 * 60 * 60 * 1000;
    
            if (now - parsedData.timestamp < oneDay) {
                setTopAnime(parsedData.data);
                trendingdata.length = 0;
                trendingdata.push(...parsedData.data);
            } else {
                localStorage.removeItem('trendingAnime');
                fetchAndStoreTrendingAnime();
            }
        } else {
            fetchAndStoreTrendingAnime();
        }
    
        fetchRef.current = true;
    }, []);
    
    function fetchAndStoreTrendingAnime() {
        fetch("https://api.jikan.moe/v4/top/anime")
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.length > 0) {
                    const topTen = data.data.slice(0, 10).map(anime => ({
                        title: anime.title,
                        title_english: anime.title_english,
                        score: anime.score,
                        imageUrl: anime.images.jpg.large_image_url,
                        url: anime.url,
                        synopsis: anime.synopsis,
                        genres: anime.genres,
                        title_japanese: anime.title_japanese,
                        aniimages: anime.images,
                        themes: anime.themes
                    }));
                    setTopAnime(topTen);
                    trendingdata.length = 0;
                    trendingdata.push(...topTen);
                    localStorage.setItem('trendingAnime', JSON.stringify({
                        data: topTen,
                        timestamp: new Date().getTime()
                    }));
                }
            })
            .catch(error => {
                console.error("Error fetching trending anime:", error);
            });
    }

    useEffect(() => {
        if (topAnime.length > 0) {
            const interval = setInterval(() => {
                setPrevIndex(currentIndex);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % topAnime.length);
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [topAnime, currentIndex]);

    return (
        <div className="trendingheroslider">
            <div>
            {prevIndex !== null && (
                <img
                    src={topAnime[prevIndex]?.imageUrl}
                    alt="Previous Slide"
                    className="slide-image fade-out"
                />
            )}
            {topAnime.length > 0 && (
                <img
                    src={topAnime[currentIndex]?.imageUrl}
                    alt="Current Slide"
                    className="slide-image fade-in"
                />
            )}

            </div>
            <div className="trendingherosliderdata">
            {topAnime.length > 0 && (
                <>
                <p style={{fontSize:'50px'}}>{topAnime[currentIndex].title_japanese}</p>
                <p>{topAnime[currentIndex].title}</p>
                <p>⭐ {topAnime[currentIndex].score}</p>
                {topAnime[currentIndex].genres.map((gen) => (
                      <span key={gen.name} style={{ marginRight: "8px" }} className="genre-tag">
                      {gen.name}
                    </span>
                ))}
                
                {topAnime[currentIndex].themes.map((obj) => (
                <span key={obj.mal_id} style={{ marginRight: "8px" }} className="genre-tag">
                    {obj.name}
                </span>
                ))}
                <SynopsisText text={topAnime[currentIndex].synopsis} />
  
                </>
            )}


            </div>

        </div>
    );
}

