import React from 'react';
import {isAuthorized} from '../auth';

const Logout = () => {
    return <div className='bg-warning p-3'>
        <h1>LOGGING OUT</h1>
        <p>You are about to log out, are you sure?</p>
    </div>
};

export default Logout;