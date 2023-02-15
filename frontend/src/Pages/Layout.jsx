import {Outlet, Link} from 'react-router-dom';
import React from 'react';
import {Navbar, Nav, Container, Button, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import smallLogo from '../resources/rsmouth2.png';
import '../styles/Layout.css';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <Container fluid>
            <Navbar className='navi' expand='lg' variant='dark'>
                <Navbar.Brand className='navbrand' href='/'>
                    <Stack direction='horizontal' gap={3}>
                        <span className='border border-4 rounded'>
                    <img

                        src={smallLogo}
                        width='26'
                        height='30'
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                    </span>
                    Polish Your Accent
                    </Stack>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-nav light' />
                <Navbar.Collapse id='navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link as={Link} to='/about'>
                            <Button variant='outline-primary'>About</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/teaminfo'>
                            <Button variant='outline-primary'>Team</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/registration'>
                            <Button variant='outline-primary'>Login</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/demo'>
                            <Button variant='outline-success'>Lessons</Button>
                        </Nav.Link>
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