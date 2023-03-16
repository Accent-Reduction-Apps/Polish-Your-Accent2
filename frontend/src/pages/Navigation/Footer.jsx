import React, {useState, useEffect} from 'react';
import {FaFacebook, FaLinkedin, FaTwitter} from 'react-icons/fa';
import '../../styles/Footer.css';
import Authservice from "../../security/auth/authservice";
import {LANGUAGES} from "../../resources/languages";

const Footer = () => {
    const [time, setTime] = useState(new Date());
    const [serverStatus, setServerStatus] = useState('');

    useEffect(() => {
        const intervalFooter = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalFooter);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch('http://localhost:8080/actuator/health')
                .then(response => response.json())
                .then(data => {
                    setServerStatus(data.status === 'UP' ? LANGUAGES.pl.ServerUp : LANGUAGES.pl.ServerDown);
                })
                .catch(error => {
                    setServerStatus(' Server down');
                });
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const options = {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formattedTime = time.toLocaleDateString(undefined, options);

    const noauthinfo = LANGUAGES.pl.NotSignedIn;
    let authinfo = LANGUAGES.pl.SignedIn;
    let authuser = Authservice.getCurrentUser();
    return (<footer className='footer'>
            <span style={{color: 'khaki'}}>
                &copy; 2023 Team Slotherin.
                <a style={{color: 'darkkhaki'}}>{serverStatus}</a>
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
                {authuser ? (<>{authinfo} {authuser.username}... </>) : (<>{noauthinfo}</>)} {formattedTime}
            </span>
            {/*<span style={{color: 'khaki'}}>*/}
            {/*    {serverStatus}*/}
            {/*</span>*/}
        </footer>
    );
};

export default Footer;
