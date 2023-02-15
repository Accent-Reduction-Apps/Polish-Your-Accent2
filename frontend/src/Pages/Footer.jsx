import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="footer">
            <Container className='p-2 container-fluid'>
                <Row>
                    <Col md={6} className="text-left">
                        &copy; 2023 Team FabFour. All Rights Reserved.
                    </Col>
                    <Col md={1} className="text-right">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={24} className="mr-2" />
                        </a>
                        {currentTime}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
