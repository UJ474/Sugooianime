import { useEffect, useState, useRef } from "react";
import trendingdata from "./trendingdata.jsx";
import SynopsisText from "./synopsistext.jsx";
import './trendinganime.css'

import img1 from './TrendingAssests/frieren.png'
import img2 from './TrendingAssests/fullmetal.png'
import img3 from './TrendingAssests/steinsgate.png'
import img4 from './TrendingAssests/onepiecefanletter.png'
import img5 from './TrendingAssests/attackontitan.png'
import img6 from './TrendingAssests/gintama4.png'
import img7 from './TrendingAssests/gintamafinal.png'
import img8 from './TrendingAssests/hunterxhunter.png'
import img9 from './TrendingAssests/gintama2.png'
import img10 from './TrendingAssests/gintamaen.png'



export default function TrendingAnime() {
    const [topAnime, setTopAnime] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const fetchRef = useRef(false);
    const imagelinks = [
        img1, img2, img3, img4, img5, img6, img7, img8, img9, img10
    ]

    useEffect(() => {
        // localStorage.removeItem('trendingAnime');
        // localStorage is a Web API that allows you to store key-value pairs in the browser...
        // and the data persists even after the page is refreshed or the browser is closed.

        const storedData = localStorage.getItem('trendingAnime');
    
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const now = new Date().getTime();
            const oneday = 24 * 60 * 60 * 1000;
    
            if (now - parsedData.timestamp < oneday) {
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
        <>
        <div className="trendingheroslider">
            <div className="herosliderimages">
            {prevIndex !== null && (
                <img
                    src={imagelinks[prevIndex]}
                    alt="Previous Slide"
                    className="slide-image fade-out"
                />
            )}
            {topAnime.length > 0 && (
                <img
                    src={imagelinks[currentIndex]}
                    alt="Current Slide"
                    className="slide-image fade-in"
                />
            )}

            </div>
            <div className="trendingherosliderdata content-fade-in">
            {topAnime.length > 0 && (
                <>
                <p style={{fontSize:'30px', paddingBottom:'2rem', marginTop:'6rem'}}>{topAnime[currentIndex].title_japanese}</p>
                <p style={{fontSize:'1rem', opacity:'0.6'}}>{topAnime[currentIndex].title}</p>
                {/* <p style={{padding:'0.5rem'}}>⭐ {topAnime[currentIndex].score}</p> */}
                <div style={{padding:'0.5rem'}}>
                {topAnime[currentIndex].genres.map((gen) => (
                      <a href={gen.url} key={gen.name} style={{ marginRight: "8px", textDecoration: 'none', color: 'inherit' }} className="genre-tag">
                      {gen.name}
                    </a>
                ))}
                </div>
                
                {/* {topAnime[currentIndex].themes.map((obj) => (
                <a href={obj.url} key={obj.mal_id} style={{ marginRight: "8px", textDecoration: 'none', color: 'inherit' }} className="genre-tag">
                    {obj.name}
                </a>
                ))} */}
                <SynopsisText text={topAnime[currentIndex].synopsis} />
                </>
            )}
            </div>

        </div>
        </>
    );
}
