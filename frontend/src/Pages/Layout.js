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
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Team</Link>
                    </li>
                    <li>
                        <Link to="/registration">Login</Link>
                    </li>
                    <li>
                        <Link to="/demo">Lessons</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;