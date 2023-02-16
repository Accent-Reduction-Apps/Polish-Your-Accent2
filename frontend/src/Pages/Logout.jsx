import React from 'react';
import { Link } from 'react-router-dom';
import { setAuthorized } from '../auth';
import { isAuthorized } from '../auth';

function Logout() {
    function logoutAction() {
        console.log(`before: ${isAuthorized()}`);
        setAuthorized(false);
        console.log(`after: ${isAuthorized()}`);
    }

    return (
        <div className='bg-warning p-3'>
            <h1>Logout</h1>
            <p>Are you sure you want to log out?</p>
            <Link to="/" onClick={logoutAction}>Log out</Link>
        </div>
    );
}

export default Logout;
