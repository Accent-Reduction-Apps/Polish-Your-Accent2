import {Outlet, Link} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import {Navbar, Nav, Container, Button, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import smallLogo from '../../resources/image/rsmouth2.png';
import '../../styles/Layout.css';
import Footer from './Footer';

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
            <Nav.Link as={Link} to='/demo'>
                <Button variant='outline-warning'>Lessons</Button>
            </Nav.Link>
            <Nav.Link as={Link} to='/teaminfo'>
                <Button variant='outline-warning'>My account</Button>
            </Nav.Link>
            <Nav.Link as={Link} to='/logout'>
                <Button
                    variant='outline-warning'>Log out</Button>
            </Nav.Link>
        </>
    ) : (<Nav.Link as={Link} to='/registration'>
        <Button onClick={() => setIsUserAuthorized(true)}
                variant='outline-warning'>Log in</Button>
    </Nav.Link>);

    return (
        <Container fluid key={isAuthorized}>
            <Navbar className='navi' expand='lg' variant='dark'>
                <Navbar.Brand className='navbrand' href='/'>
                    <Stack direction='horizontal' gap={3} className='navtitle'>
                        <span className='me-1'/>
                        <span className='border border-4 rounded'>
                    <img

                        src={smallLogo}
                        width='29'
                        height='39'
                        className="d-inline-block align-items-center"
                        alt="logo"
                    />
                    </span>
                        POLISH YOUR ACCENT
                    </Stack>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-nav light'/>
                <Navbar.Collapse id='navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link as={Link} to='/about'>
                            <Button variant='outline-warning'>About</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/teaminfo'>
                            <Button variant='outline-warning'>Team</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/auxiliary'>
                            <Button variant='outline-warning'>Auxiliary</Button>
                        </Nav.Link>
                        {extraButtons}
                        <Navbar.Text>
                            <div className='navtitle'> auth: {isUserAuthorized ? '1' : '0'}</div>
                        </Navbar.Text>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
            {children}
            <Outlet className='bg-warning p-3'/>
            <Footer/>
        </Container>
    );
};

export default Layout;