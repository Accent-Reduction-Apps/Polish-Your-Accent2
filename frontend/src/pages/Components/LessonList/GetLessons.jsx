import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import '../../../styles/GetLessons.css';
import authHeader from "../../../security/auth/auth-header";
import {Container, Table} from "react-bootstrap";

const GetLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [error] = useState(null);
    const [isLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const lessons = await fetchData();
            setLessons(lessons);
        }
        getData();
    }, []);

    // const fetchData = async () => {
    //
    //     const response = await fetch('http://localhost:8080/lessons');
    //     return await response.json();
    // }
    const fetchData = async () => {
        const headers = authHeader();
        const response = await fetch('http://localhost:8080/lessons', { headers });
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
        <div className='bg-warning p-3'>
            <table className="lesson-table">
                <thead>
                <tr>
                    <th className="lesson-table-header"></th>
                    <th className="lesson-table-header"><span> PLEASE SELECT A LESSON TO LEARN</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {lessons.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'lesson-table-row-even' : 'lesson-table-row-odd'}>
                        <td className="lesson-table-cell">
                            <Link className={index % 2 === 0 ? 'lesson-table-link-even' : 'lesson-table-link-odd'} to={`/lesson/${item.id}`} state={item}>
                                {item.id}
                            </Link>
                        </td>
                        <td className="lesson-table-cell">
                            <Link className={index % 2 === 0 ? 'lesson-table-link-even' : 'lesson-table-link-odd'} to={`/lesson/${item.id}`} state={item}>
                                {item.topic}
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetLessons;