import { useEffect, useState, useRef } from "react";
// import trendingdata from "../TrendingAnime/trendingdata";
import suggestedanimedata from './suggestedanimedata.jsx'


export default function SuggestedAnime() {
    const [suggestedAnimes, setSuggestedAnimes] = useState([]);
    const fetchRef = useRef(false);

    useEffect(() => {
        localStorage.removeItem('trendingAnime');
        // localStorage is a Web API that allows you to store key-value pairs in the browser...
        // and the data persists even after the page is refreshed or the browser is closed.

        const suggestedStoredData = localStorage.getItem('suggestedanimesdata');

        if (suggestedStoredData) {
            const parsedData = JSON.parse(suggestedStoredData);
            const now = new Date().getTime();
            const oneday = 24 * 60 * 60 * 1000;

            if (now - parsedData.timestamp < oneday) {
                setSuggestedAnimes(parsedData.data);
                suggestedanimedata.length = 0;
                suggestedanimedata.push(...parsedData.data);
            } else {
                localStorage.removeItem('suggestedanimesdata');
                fetchAndStoreSuggestedAnime();
            }
        } else {
            fetchAndStoreSuggestedAnime();
        }

        fetchRef.current = true;
    }, []);


    function fetchAndStoreSuggestedAnime() {
        fetch("https://api.jikan.moe/v4/top/anime?filter=airing")
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
                        themes: anime.themes
                    }));
                    setSuggestedAnimes(top30);
                    suggestedanimedata.length = 0;
                    suggestedanimedata.push(...top30);
                    localStorage.setItem('suggestedanimesdata', JSON.stringify({
                        data: top30,
                        timestamp: new Date().getTime()
                    }));
                }
            })
            .catch(error => {
                console.log("Error fetching trending anime:", error);
            });
    }


    return (
        <>
        <div>
            {suggestedAnimes.length > 0 && (
                <>
                    {suggestedAnimes.map((animename, index) => (
                    <p key={index}>{animename.title_japanese}</p>
                    ))}
                </>
            )}
        </div>

        </>
    )
}
