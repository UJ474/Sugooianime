import { useEffect, useState, useRef } from "react";
import suggestedanimedata from './suggestedanimedata.jsx'
import AnimeCard from "../components/animecard.jsx";
import './suggestedanime.css';




export default function SuggestedAnime() {
    const [suggestedAnimes, setSuggestedAnimes] = useState([]);
    const fetchRef = useRef(false);
    const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("animePage")) || 1);

    useEffect(() => {
        localStorage.removeItem('suggestedanimesdata');

        const suggestedStoredData = localStorage.getItem('suggestedanimesdata');

        if (suggestedStoredData) {
            const parsedData = JSON.parse(suggestedStoredData);
            const now = new Date().getTime();
            const oneday = 24 * 60 * 60 * 1000;

            if (now - parsedData.timestamp < oneday && parsedData.page === currentPage) {
                setSuggestedAnimes(parsedData.data);
                suggestedanimedata.length = 0;
                suggestedanimedata.push(...parsedData.data);
                return;
            }
        }

        fetchAndStoreSuggestedAnime(currentPage);
    }, [currentPage]);


    useEffect(() => {
        if (fetchRef.current) {
            fetchAndStoreSuggestedAnime(currentPage);
        }
        localStorage.setItem("animePage", currentPage);
    }, [currentPage]);

    function fetchAndStoreSuggestedAnime(page) {
        fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}`)
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
                    setSuggestedAnimes(top30);
                    suggestedanimedata.length = 0;
                    suggestedanimedata.push(...top30);
                    localStorage.setItem('suggestedanimesdata', JSON.stringify({
                        data: top30,
                        timestamp: new Date().getTime(),
                        page: page
                    }));
                }
            })
            .catch(error => {
                console.log("Error fetching trending anime:", error);
            });
    }


    return (
        <>
        <div className="suggested-anime-list">
            {suggestedAnimes.length > 0 && suggestedAnimes.map((anime, index) => (
                <AnimeCard
                    key={index}
                    title={anime.title_english || anime.title}
                    imageUrl={anime.imageUrl}
                    synopsis={anime.synopsis}
                    rating={anime.score}
                />
            ))}
        </div>
            <div style={{ marginTop: '3rem' }}>
                <button className="change-buttons" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => (prev - 1))}>Prev</button>
                {Array.from({ length: 10 }, (_, i) => {
                    const startPage = Math.max(currentPage - 5, 1);
                    const pageNum = startPage + i;
                    return (
                        <button
                            key={pageNum} onClick={() => setCurrentPage(pageNum)} className="page-button"> {pageNum}
                        </button>
                    );
                })}
                <button className="change-buttons" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
            </div>
        </>
    )
}
