import '../css_files/headersection.css'
import searchImage from '../images/searchimage.png';
import savedImage from '../images/savedimage.png';
import accountImage from '../images/accountimage.png';
import hamburgerimage from '../images/hamburgerimage.png';

export default function Header() {
    const headertextlinksleft = [
        {heading: 'Home',},
        {heading: 'New',},
        {heading: 'Most Popular',},
        {heading: 'Genre',},
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
                {headertextlinksleft.map((heading, index) => {
                    return <div key={index} className='navbarleft hamburger'>{heading.heading}</div>;
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