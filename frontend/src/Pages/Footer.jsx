import React, {useState, useEffect} from 'react';
import {FaFacebook, FaLinkedin, FaTwitter} from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalFooter = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalFooter);
    }, []);

    const options = {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formattedTime = time.toLocaleDateString(undefined, options);

    return (<footer className='footer'>
            <span style={{color: 'darkkhaki'}}>
                Copyright &copy; 2023 Team Slotherin.
            </span>
            <span style={{display: 'flex', alignItems: 'center'}}>

                <a href='https://www.linkedin.com/' target="_blank" rel='noopener noreferrer' className='me-2'>
                    <FaLinkedin size={20} color="gold"/>
                </a>

                <a href='https://www.facebook.com/' target="_blank" rel='noopener noreferrer' className='me-2'>
                    <FaFacebook size={20} color="gold"/>
                </a>

                <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer' className='me-2'>
                    <FaTwitter size={20} color="gold"/>
                </a>

            </span>
            <span style={{color: 'darkkhaki'}}>
                Take your time... {formattedTime}
            </span>
        </footer>
    );
};

export default Footer;
