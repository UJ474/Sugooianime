import { useEffect, useState, useRef } from "react";
import currentanimedata from './currentanimedata.jsx';
import AnimeCard from "../components/animecard.jsx";
import './currentanime.css';

export default function CurrentAnimes() {
    const [currentAnimes, setCurrentAnimes] = useState([]);
    const fetchRef = useRef(false);
    const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("currentAnimePage")) || 1);

    useEffect(() => {
        
        const storedData = localStorage.getItem('currentanimesdata');

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const now = new Date().getTime();
            const oneday = 24 * 60 * 60 * 1000;

            if (now - parsedData.timestamp < oneday && parsedData.page === currentPage) {
                setCurrentAnimes(parsedData.data);
                currentanimedata.length = 0;
                currentanimedata.push(...parsedData.data);
                return;
            }
        }

        fetchAndStoreCurrentAnime(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (fetchRef.current) {
            fetchAndStoreCurrentAnime(currentPage);
        }
        localStorage.setItem("currentAnimePage", currentPage);
    }, [currentPage]);

    function fetchAndStoreCurrentAnime(page) {
        fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.length > 0) {
                    const top30 = data.data.slice(0, 30).map(anime => ({
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
                    setCurrentAnimes(top30);
                    currentanimedata.length = 0;
                    currentanimedata.push(...top30);
                    localStorage.setItem('currentanimesdata', JSON.stringify({
                        data: top30,
                        timestamp: new Date().getTime(),
                        page: page
                    }));
                }
            })
            .catch(error => {
                console.log("Error fetching current anime:", error);
            });
    }

    return (
        <>
        <div className="suggested-anime-list">
            {currentAnimes.length > 0 && currentAnimes.map((anime, index) => (
                <AnimeCard
                    key={index}
                    title={anime.title_english || anime.title}
                    imageUrl={anime.imageUrl}
                    synopsis={anime.synopsis}
                    rating={anime.score}
                />
            ))}
        </div>
        <div style={{ marginTop: '1rem' }}>
            <button className="change-buttons" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Prev</button>
            {Array.from({ length: 10 }, (_, i) => {
                const startPage = Math.max(currentPage - 5, 1);
                const pageNum = startPage + i;
                return (
                    <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`page-button ${currentPage === pageNum ? 'active' : ''}`}>
                        {pageNum}
                    </button>
                );
            })}
            <button className="change-buttons" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
        </>
    );
}