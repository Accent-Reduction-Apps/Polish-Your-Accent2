import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import '../../../styles/GetLessons.css';
import authHeader from "../../../security/auth/auth-header";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const GetLessonById = (props) => {
    const lessonId = useLocation();
    const id = lessonId.state.id;
    const [lesson, setLesson] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const getData = async () => {
            const dataa = await fetchData();
            setLesson(dataa);
        }
        getData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const headers = authHeader();
            const response = await fetch(
                `http://localhost:8080/lessons/${id}`, {headers}
            );

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error}</p>;
    }
    const lessonInHtml = lesson.lessonContent;
    const lessonParsed = () => {
        return (
            <div dangerouslySetInnerHTML={{ __html: lessonInHtml }}></div>
        );
    };

    return (
        <div className='p-3'>
            {lessonParsed()}
            <Link as={Link} to='/demo'>
                <Button variant='outline-dark'>Back to list</Button>
            </Link><br/><br/>
        </div>
    );
};

export default GetLessonById;
