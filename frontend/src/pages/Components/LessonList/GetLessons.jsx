import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, Form, Table} from 'react-bootstrap';
import '../../../styles/GetLessons.css';
import authHeader from "../../../security/auth/auth-header";
import Authservice from "../../../security/auth/authservice";

const GetLessons = () => {
    const user = Authservice.getCurrentUser();
    const userId = user.id;
    const [lessons, setLessons] = useState([]);
    const [error] = useState(null);
    const [isLoading] = useState(false);
    const [lessonsarray, setLessonsArray] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            const headers = authHeader();
            const userResponse = await fetch(`http://localhost:8080/users/${userId}`, {headers});
            const user = await userResponse.json();
            const lessonsIds = user && user.lessons && user.lessons.map(lesson => lesson.id);
            setLessonsArray(lessonsIds || []);

            const lessonsResponse = await fetch('http://localhost:8080/lessons', {headers});
            const data = await lessonsResponse.json();
            setLessons(data);
        };
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        if (searchTerm === '') {
            setStatusFilter('all');
        }
    };


    return (
        <Container className='bg-site p-3 d-flex flex-column justify-content-center align-items-center'>
            <Form className="d-flex justify-content-center align-items-center mb-3">
                <Form.Group controlId="searchTerm" className="m-0 mr-2">
                    <Form.Control type="text" placeholder="Search lessons..." value={searchTerm}
                                  onChange={handleSearchChange}/>
                </Form.Group>
                <Form.Group controlId="lessonStatus" className="m-2">
                    <Form.Check
                        custom
                        inline
                        type="radio"
                        name="status"
                        label={<span className="text-dark">All lessons</span>}
                        checked={statusFilter === "all"}
                        onChange={() => setStatusFilter("all")}
                        style={{"--bg-color": "lightcoral", "--active-bg-color": "red"}}
                        className="mr-2"
                    />
                    <Form.Check
                        custom
                        inline
                        type="radio"
                        name="status"
                        label={<span className="text-dark">Waiting only</span>}
                        checked={statusFilter === "waiting"}
                        onChange={() => setStatusFilter("waiting")}
                        style={{"--bg-color": "gold", "--active-bg-color": "darkgoldenrod"}}
                    />
                </Form.Group>
            </Form>
                <Table className="lesson-table" striped bordered hover>
                    <thead>
                    <tr style={{color: 'crimson', background: 'darkkhaki'}}>
                        <th className="lesson-table-header" style={{color: 'darkolivegreen'}}>#</th>
                        <th className="lesson-table-header" style={{color: 'darkolivegreen'}}><span> PLEASE SELECT A LESSON TO LEARN</span>
                        </th>
                        <th className="lesson-table-header" style={{fontSize: '1rem', color: 'darkolivegreen'}}>lesson
                            status
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {lessons.filter(item => item.topic.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => {
                        if (statusFilter === "all" || (statusFilter === "waiting" && !lessonsarray.includes(item.id))) {
                            return (
                                <tr key={item.id}
                                    className={index % 2 === 0 ? 'lesson-table-row-even' : 'lesson-table-row-odd'}>
                                    <td className="lesson-table-cell">
                                        <Link
                                            className={index % 2 === 0 ? 'lesson-table-link-even' : 'lesson-table-link-odd'}
                                            to={`/lesson/${item.id}`} state={item}>
                                            {item.id}
                                        </Link>
                                    </td>
                                    <td className="lesson-table-cell lesson-table-text">
                                        <Link
                                            className={index % 2 === 0 ? 'lesson-table-link-even' : 'lesson-table-link-odd'}
                                            to={`/lesson/${item.id}`} state={item} style={{textAlign: "center"}}>
                                            {item.topic}
                                        </Link>
                                    </td>
                                    <td className="lesson-table-cell">
                                        <Link
                                            className={index % 2 === 0 ? 'lesson-table-link-even' : 'lesson-table-link-odd'}
                                            to={`/lesson/${item.id}`} state={item}>
                                            {lessonsarray.includes(item.id) ? (<>completed</>) : <>waiting</>}
                                        </Link>
                                    </td>
                                </tr>
                            );
                        } else {
                            return null;
                        }
                    })}
                    </tbody>
                </Table>
        </Container>
);
}
export default GetLessons;
