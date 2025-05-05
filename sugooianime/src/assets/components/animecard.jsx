import '../css_files/animecard.css';
import SynopsisText from '../HomePage/TrendingAnime/synopsistext';

export default function AnimeCard({ title, imageUrl, synopsis, rating }) {
    return (
        <div className="anime-card">
            <img src={imageUrl} alt={title} className="anime-image" />
            <div className="anime-overlay">
                <div className="anime-info">
                    <h3 className="anime-title">{title}</h3>
                    <div className="anime-synopsis"><SynopsisText text={synopsis} limit={150} /></div>
                    <p className="anime-rate">Rating: {rating || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}