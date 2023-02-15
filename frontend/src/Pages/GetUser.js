import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const GetUser = () => {
    let userid = 2;
    console.log(userid);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        async function fetchUsers() {
            setIsLoading(true);
            setError(null);

            try {
            const response = await fetch(`http://localhost:8080/users/${userid}`);

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setUsers(json)
            return json;
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUsers().then(json => console.log(json));
        console.log(users);
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error}</p>;
    }

    return (
        <div className="my-account">


                    <p>Name: {users.name}</p>
                    <p>Email Address: {users.emailAddress}</p>
                    <p>password: {users.password}</p>


        </div>
    );
};
export default GetUser;