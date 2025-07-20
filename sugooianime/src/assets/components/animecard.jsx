import { Link } from 'react-router-dom';
import '../css_files/animecard.css';
import SynopsisText from '../HomePage/TrendingAnime/synopsistext';

export default function AnimeCard({ title, imageUrl, synopsis, rating }) {
    return (
        <Link to={`/anime/${encodeURIComponent(title)}`} className="animecardlink">
            <div className="animecard">
                <img src={imageUrl} alt={title} className="animeimage" />
                <div className="animeoverlay">
                    <div className="animeinfo">
                        <h3 className="animetitle">{title}</h3>
                        {/* <div className="animesynopsis"><SynopsisText text={synopsis} limit={150} /></div> */}
                        {/* <p className="animerate">Rating: {rating || 'N/A'}</p> */}
                    </div>
                </div>
            </div>
        </Link>
    );
}
