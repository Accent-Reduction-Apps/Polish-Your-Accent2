import {Outlet, Link, Route} from "react-router-dom";
import GetLessonById from "./GetLessonById";
import React from "react";

const Layout = () => {
    return (
        <>
            <nav>
                <p>to by byla czesc nawigacyjna apki</p>
                <ul>
                    <li>
                        <Link to="/">HOME</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Team</Link>
                    </li>
                    <li>
                        <Link to="/registration">Register here</Link>
                    </li>
                    <li>
                        <Link to="/demo">Demo</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;