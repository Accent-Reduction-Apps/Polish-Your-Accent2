import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import '../../../styles/GetLessons.css';

const GetLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const lessons = await fetchData();
            setLessons(lessons);
        }
        getData();
    }, []);

    const fetchData = async () => {

        const response = await fetch('http://localhost:8080/lessons');
        return await response.json();
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error}</p>;
    }

    return (
        <table className="table">
            <tbody>

            {lessons.map((item) => (
                <tr key={item.id}>

                        <td><Link to={`/lesson/${item.id}`} state={item}>{item.id}</Link></td>
                        <td><Link to={`/lesson/${item.id}`} state={item}>{item.topic}</Link></td>
                        <td><Link to={`/lesson/${item.id}`} state={item}>{item.text}</Link></td>

                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default GetLessons;