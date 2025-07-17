import { Link } from 'react-router-dom';
import '../css_files/headersection.css'
import searchImage from '../images/searchimage.png';
import savedImage from '../images/savedimage.png';
import accountImage from '../images/accountimage.png';
import hamburgerimage from '../images/hamburgerimage.png';
import sugooianimelogo from '../images/sugooianimelogo2.png';

export default function Header() {
    const headertextlinksleft = [
        { heading: 'Home', path: '/' },
        { heading: 'New', path: '/current' },
        { heading: 'Most Popular', path: '/suggested' },
        { heading: 'Genre', path: '/filter' },
    ]

    const headertextlinksright = [
        { image: searchImage, alt: 'Search' },
        { image: savedImage, alt: 'Saved' },
        { image: accountImage, alt: 'Account' },
    ];
    
    return (
        <nav className="headersectionmain">
            <div className="navbarleft-container">
                <img src={hamburgerimage} alt='hamburgerimage' className='hamburgerimage'/>
                <Link to='/' ><img src={sugooianimelogo} alt='sugooianimelogo' className='sugooianimelogo'/></Link>
                {headertextlinksleft.map((heading, index) => {
                    return <Link to={heading.path} key={index} className='navbarleft hamburger'>{heading.heading}</Link>;
                })}
            </div>
            <div className="navbarright-container">
                {headertextlinksright.map((Header, index) => {
                    return <img key={index} src={Header.image} alt={Header.alt} className='navbarright' />;
                })}
            </div>
        </nav>
        
    )
    
}