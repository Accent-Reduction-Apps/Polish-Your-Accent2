import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../../../styles/GetLessons.css';
import authHeader from "../../../security/auth/auth-header";
import Authservice from "../../../security/auth/authservice";

const GetLessons = () => {
    const user = Authservice.getCurrentUser();
    const userid = user.id;
    const [lessons, setLessons] = useState([]);
    const [error] = useState(null);
    const [isLoading] = useState(false);
    const [lessonsarray, setLessonsArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const headers = authHeader();
            const userResponse = await fetch(`http://localhost:8080/users/${userid}`, { headers });
            const user = await userResponse.json();
            const lessonsIds = user && user.lessons && user.lessons.map(lesson => lesson.id);
            setLessonsArray(lessonsIds || []);

            const lessonsResponse = await fetch('http://localhost:8080/lessons', { headers });
            const data = await lessonsResponse.json();
            setLessons(data);
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error}</p>;
    }

    return (
        <div className='bg-site p-3'>
            <table className="lesson-table">
                <thead>
                <tr>
                    <th className="lesson-table-header"></th>
                    <th className="lesson-table-header"><span> PLEASE SELECT A LESSON TO LEARN</span>
                    </th>
                    <th className="lesson-table-header" style={{color: 'khaki', fontSize: '1rem'}}>status</th>
                </tr>
                </thead>
                <tbody>
                {lessons.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'lesson-table-row-even' : 'lesson-table-row-odd'}>
                        <td className="lesson-table-cell">
                            <Link className={index % 2 === 0 ? 'lesson-table-link-even' : 'lesson-table-link-odd'}
                                  to={`/lesson/${item.id}`} state={item}>
                                {item.id}
                            </Link>
                        </td>
                        <td className="lesson-table-cell lesson-table-text">
                            <Link className={index % 2 === 0 ? 'lesson-table-link-even' : 'lesson-table-link-odd'}
                                  to={`/lesson/${item.id}`} state={item} style={{textAlign: "center"}}>
                                {item.topic}
                            </Link>
                        </td>
                        <td className="lesson-table-cell">
                            <Link className={index % 2 === 0 ? 'lesson-table-link-even' : 'lesson-table-link-odd'}
                                  to={`/lesson/${item.id}`} state={item}>
                                {lessonsarray.includes(item.id) ? (<>completed</>) : <>waiting</>}

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
