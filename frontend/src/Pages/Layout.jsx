import {Outlet, Link} from 'react-router-dom';
import React, {useState} from 'react';
import {Navbar, Nav, Container, Button, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import smallLogo from '../resources/rsmouth2.png';
import '../styles/Layout.css';
import Footer from './Footer';
import {isAuthorized} from '../auth';

const Layout = ({ children }) => {
  //  let buttonChange;
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthorized);
    const buttonChange = isLoggedIn ? 'Log out' : 'Log in';
    const loginLink = isLoggedIn ? '/logout' : '/registration';
    const extraButtons = isLoggedIn ? (
        <>
            <Nav.Link as={Link} to='/demo'>
                <Button variant='outline-warning'>Lessons</Button>
            </Nav.Link>
            <Nav.Link as={Link} to='/teaminfo'>
                <Button variant='outline-warning'>My account</Button>
            </Nav.Link>
        </>
    ) : null;

    console.log(`Layout gets this: ${isAuthorized()}`);

    return (
        <Container fluid>
            <Navbar className='navi' expand='lg' variant='dark'>
                <Navbar.Brand className='navbrand' href='/'>
                    <Stack direction='horizontal' gap={3} className='navtitle'>
                        <span className='me-1' />
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
                <Navbar.Toggle aria-controls='navbar-nav light' />
                <Navbar.Collapse id='navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link as={Link} to='/about'>
                            <Button variant='outline-warning'>About</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/teaminfo'>
                            <Button variant='outline-warning'>Team</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to={loginLink}>
                            <Button variant='outline-warning'>{buttonChange}</Button>
                        </Nav.Link>
                        {extraButtons}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {children}
            <Outlet className='bg-warning p-3' />
            <Footer />
        </Container>

    );
};

export default Layout;