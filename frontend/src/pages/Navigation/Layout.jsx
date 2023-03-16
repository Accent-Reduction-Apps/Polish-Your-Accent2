import {Link, Outlet} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Nav, Navbar, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import smallLogo from '../../resources/image/rsmouth2.png';
import '../../styles/Layout.css';
import Footer from './Footer';
import Authservice from "../../security/auth/authservice";
import {LANGUAGES} from '../../resources/languages';

import {AuthorizationContext} from "../../auxiliary/AuthorizationContext";
const Layout = ({children}) => {


    const [isUserAuthorized, setIsUserAuthorized] = useContext(AuthorizationContext);

    const [isAuthorized, setAuthorized] = useState(window.$authorized);
    useEffect(() => {
        const handleActiveChange = () => {
            setAuthorized(window.$authorized);
        };

        window.addEventListener('activechange', handleActiveChange);

        return () => {
            window.removeEventListener('activechange', handleActiveChange);
        };
    }, []);


    const extraButtons = isUserAuthorized ? (
        <>
            <Nav.Link as={Link} to='/lessons'>
                <Button variant='outline-warning'>{LANGUAGES.pl.Lessons}</Button>
            </Nav.Link>
            <Nav.Link as={Link} to='/my-account'>
                <Button variant='outline-warning'>{LANGUAGES.pl.MyAccount}</Button>
            </Nav.Link>
            <Nav.Link as={Link} to='/logout'>
                <Button
                    variant='outline-warning'>{LANGUAGES.pl.LogOut}</Button>
            </Nav.Link>
        </>
    ) : (<Nav.Link as={Link} to='/signin'>
        <Button
            variant='outline-warning'>{LANGUAGES.pl.LogIn}</Button>
    </Nav.Link>);

    let userBK = Authservice.getCurrentUser();
    if (userBK) {
        setIsUserAuthorized(true);
    }
    return (
        <Container className="main-nav" fluid key={isAuthorized}>
            <Navbar className='navi' expand='lg' variant='dark'>

                <Navbar.Brand className='nav-brand' href='/about'>
                    <Stack direction='horizontal' gap={3} className='nav-title'>
                        <Navbar.Brand className='navbrand' href='/about'>
                            <Stack direction='horizontal' gap={3} className='navtitle'>

                                <span className='me-1'/>
                                <img
                                    src={smallLogo}
                                    width='37'
                                    height='47'
                                    className="d-inline-block border border-4 rounded"
                                    alt="logo"
                                />
                                POLISH YOUR ACCENT
                            </Stack>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='navbar-nav light'/>
                        <Navbar.Collapse id='navbar-nav'>
                            <Nav className='mr-auto'>
                                <Nav.Link as={Link} to='/about'>
                                    <Button variant='outline-warning' >{LANGUAGES.pl.About}</Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to='/teaminfo'>
                                    <Button variant='outline-warning'>{LANGUAGES.pl.Team}</Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to='/auxiliary'>
                                    <Button variant='outline-warning'>{LANGUAGES.pl.Practice}</Button>
                                </Nav.Link>
                                {extraButtons}
                            </Nav>
                        </Navbar.Collapse>
                    </Stack>
                </Navbar.Brand>
            </Navbar>
            {children}
            <Outlet className='bg-warning p-3'/>
            <Footer/>
        </Container>
    );
}

export default Layout;