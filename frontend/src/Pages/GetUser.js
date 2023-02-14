import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const GetUser = () => {
    const userid = useLocation().state.id;
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        async function fetchUsers() {
            setIsLoading(true);
            setError(null);

            // try {
            // const id = `2`;
            const response = await fetch(`http://localhost:8080/users/${userid}`);

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setUsers(json)
            return json;
            // } catch (e) {
            //     setError(e.message);
            // } finally {
            //     setIsLoading(false);
            // }
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
        <div>
            {users.map((user) => (
                <p key={user.id}>
                    <p><Link to={`/users/${user.id}`} state={user}>{user.id}</Link></p>
                    <p><Link to={`/users/${user.id}`} state={user}>{user.name}</Link></p>
                    <p><Link to={`/users/${user.id}`} state={user}>{user.password}</Link></p>

                </p>
            ))}
        </div>
    );
};
export default GetUser;