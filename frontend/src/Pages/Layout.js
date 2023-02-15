import {Outlet, Link, Route} from "react-router-dom";
import GetLessonById from "./GetLessonById";
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Layout = ({ children }) => {
    return (
        <Container fluid>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Polish Your Accent</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/about">
                            About
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact">
                            Team
                        </Nav.Link>
                        <Nav.Link as={Link} to="/registration">
                            <Button variant="outline-primary">Login</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/demo">
                            <Button variant="primary">Lessons</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {children}
            <Outlet />
        </Container>

    );
};

export default Layout;

//
// const Layout = () => {
//     return (
//         <>
//             <nav>
//                 <p>to by byla czesc nawigacyjna apki</p>
//                 <Button as="a" variant="primary">
//                     Delete all
//                 </Button>
//                 <Button as="a" variant="success">
//                     Autodestruction
//                 </Button>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">About</Link>
//                     </li>
//                     <li>
//                         <Link to="/contact">Team</Link>
//                     </li>
//                     <li>
//                         <Link to="/registration">Login</Link>
//                     </li>
//                     <li>
//                         <Link to="/demo">Lessons</Link>
//                     </li>
//                 </ul>
//             </nav>
//
//             <Outlet />
//         </>
//     )
// };
//
// export default Layout;