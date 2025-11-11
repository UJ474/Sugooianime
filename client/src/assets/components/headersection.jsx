import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import '../css_files/headersection.css'
import searchImage from '../images/searchimage.png';
import savedImage from '../images/savedimage.png';
import accountImage from '../images/accountimage.png';
import hamburgerimage from '../images/hamburgerimage.png';
import sugooianimelogo from '../images/sugooianimelogo2.png';

export default function Header() {
    const headerTextLinksLeft = [
        { heading: 'Home', path: '/' },
        { heading: 'New', path: '/current' },
        { heading: 'Most Popular', path: '/suggested' },
        { heading: 'Genre', path: '/filter' },
    ];

    const headerTextLinksRight = [
        { image: searchImage, alt: 'Search' },
        // { image: savedImage, alt: 'Saved' },
        // { image: accountImage, alt: 'Account' },
    ];

    const [mode, setMode] = useState('dark');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length >= 2) {
            try {
                const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`);
                const data = await res.json();
                setSearchResults(data.data || []);
            } catch (err) {
                console.error('Search error:', err);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/search/${searchQuery.trim()}`);
            setSearchResults([]);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        const savedMode = localStorage.getItem('mode');
        if (savedMode) setMode(savedMode);
    }, []);

    useEffect(() => {
        document.body.classList.remove('dark-theme', 'light-theme', 'grayscale-mode');
        if (mode === 'light') document.body.classList.add('light-theme');
        else if (mode === 'dark') document.body.classList.add('dark-theme');
        else if (mode === 'bw') document.body.classList.add('grayscale-mode');

        localStorage.setItem('mode', mode);
    }, [mode]);

    const cycleMode = () => {
        setMode(prev => (prev === 'dark' ? 'light' : prev === 'light' ? 'bw' : 'dark'));
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const handleMobileLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="headersectionmain">
            <div className="navbarleftcontainer">
                <img src={hamburgerimage} alt='hamburger' className='hamburgerimage' onClick={toggleMobileMenu}/>
                <Link to='/'><img src={sugooianimelogo} alt='logo' className='sugooianimelogo'/></Link>
                {headerTextLinksLeft.map((item, i) => (
                    <Link to={item.path} key={i} className='navbarleft hamburger'>{item.heading}</Link>
                ))}
                {mobileMenuOpen && (
                    <div className="mobilemenu">
                        {headerTextLinksLeft.map((item, i) => (
                            <Link to={item.path} key={i} onClick={handleMobileLinkClick}>{item.heading}</Link>
                        ))}
                    </div>
                )}
            </div>
            <div className="searchbarcontainer">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    onKeyDown={handleKeyPress}
                    placeholder="Search anime..."
                    className="searchinput"
                />
                {searchResults.length > 0 && (
                    <div className="searchdropdown">
                        {searchResults.map(anime => (
                            <div
                                key={anime.mal_id}
                                className="searchitem"
                                onClick={() => {
                                    navigate(`/anime/${anime.title}`);
                                    setSearchQuery('');
                                    setSearchResults([]);
                                }}
                            >
                                {anime.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="navbarrightcontainer">
                {headerTextLinksRight.map((item, i) => (
                    <img key={i} src={item.image} alt={item.alt} className='navbarright' />
                ))}
            </div>

            <button onClick={cycleMode} className="themetogglebutton">
                {mode === 'dark' ? 'Day' : mode === 'light' ? 'B/W' : 'Night'}
            </button>
        </nav>
    );
}
