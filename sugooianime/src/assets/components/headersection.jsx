import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

    return (
        <nav className="headersectionmain">
            <div className="navbarleftcontainer">
                <img src={hamburgerimage} alt='hamburger' className='hamburgerimage'/>
                <Link to='/'><img src={sugooianimelogo} alt='logo' className='sugooianimelogo'/></Link>
                {headerTextLinksLeft.map((item, i) => (
                    <Link to={item.path} key={i} className='navbarleft hamburger'>{item.heading}</Link>
                ))}
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
