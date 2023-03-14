import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../../../styles/GetLessons.css';
import authHeader from '../../../security/auth/auth-header';
import Authservice from "../../../security/auth/authservice";

const fetchData = async (id) => {
    try {
        const headers = authHeader();
        const response = await fetch(`http://localhost:8080/lessons/${id}`, { headers });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    } catch (e) {
        throw new Error(`An error occurred: ${e.message}`);
    }
};

const GetLessonById = (props) => {
    const lessonId = useLocation();
    const id = lessonId.state.id;
    const [lesson, setLesson] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);

            try {
                const data = await fetchData(id);
                setLesson(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [id]);

    const markLessonComplete = async () => {
        try {
            const user = Authservice.getCurrentUser();
            const userid = user.id;
            const headers = authHeader();
            const response = await fetch(
                `http://localhost:8080/users/addReadLesson?lesson_id=${id}&userStudent_id=${userid}`,
                { method: 'PATCH', headers }
            );
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            window.location.href = '/demo';
        } catch (e) {
            setError(`An error occurred: ${e.message}`);
        }
    };

    const lessonInHtml = lesson?.lessonContent;
    const lessonParsed = () => {
        return <div dangerouslySetInnerHTML={{ __html: lessonInHtml }}></div>;
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-3">
            {lessonParsed()}
            <div className="d-flex justify-content-center">
                <div className="mr-8">
                    <Link to="/demo">
                        <Button variant="primary">Back to list</Button>
                    </Link>
                </div>
                <div className="ml-8">
                    <Button variant="info" onClick={markLessonComplete}>
                        Press to complete the lesson
                    </Button>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
};

export default GetLessonById;
