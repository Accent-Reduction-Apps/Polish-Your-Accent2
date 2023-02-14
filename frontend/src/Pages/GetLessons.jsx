import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import './GetLessons.css';

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
        // setIsLoading(true);
        // setError(null);
        //
        // try {
        //     const response = await fetch("http://localhost:8080/lessons");
        //
        //     if (!response.ok) {
        //         throw new Error(response.statusText);
        //     }
        //
        //     const json = await response.json();
        //     setData(json)
        //     console.log(json)
        //     return json;
        //
        // } catch (e) {
        //     setError(e.message);
        // } finally {
        //     setIsLoading(false);
        // }

        const response = await fetch('http://localhost:8080/lessons');
        const data = await response.json();
        return data;
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
            {/*<thead>*/}
            {/*<tr>*/}
            {/*    <th>Lesson Id</th>*/}
            {/*    <th>Topic</th>*/}
            {/*    <th>Text</th>*/}
            {/*</tr>*/}
            {/*</thead>*/}

            {lessons.map((item) => (
                <tr key={item.id}>
                    <Link to={`/lesson/${item.id}`} state={item}>
                        <td>{item.id}</td>
                        <td>{item.topic}</td>
                        <td>{item.text}</td>
                    </Link>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default GetLessons;
