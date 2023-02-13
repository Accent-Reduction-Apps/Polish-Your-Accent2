import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import '../GetLessons.css';

const GetLessons = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("http://localhost:8080/lessons");

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const json = await response.json();
                setData(json);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error}</p>;
    }

    return (
        <table className="table">
            <thead>
            <tr>
                <th>Lesson Id</th>
                <th>Topic</th>
                <th>Text</th>
            </tr>
            </thead>
            <tbody>
            {data.map(item => (
                <Link to={`/lesson/${item.id}`} key={item.id}>
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.topic}</td>
                        <td>{item.text}</td>
                    </tr>
                </Link>
            ))}
            </tbody>
        </table>
    );
};

export default GetLessons;
