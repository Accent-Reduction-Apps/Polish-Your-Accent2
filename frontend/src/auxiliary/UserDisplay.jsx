import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDisplay() {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get('/api/user');
            setUser(response.data);
        }
        fetchUser();
    }, []);

    return (
        <div>
            {user.username && <p>Logged in as: {user.username}</p>}
        </div>
    );
}

export default UserDisplay;
