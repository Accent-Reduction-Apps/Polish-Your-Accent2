import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import YTVideo from './YTVideo';
import '../styles/GetLessons.css';

const GetLessonById = (props) => {
    const videoId = 'rGIJ8I3hPts';
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

    const fetchData = async() => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8080/lessons/${id}`
            );

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const json = await response.json();
            return json;
            // setLesson(json);
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
    //console.log(lesson.text);
    return (
        <div>
            <h2 className={'details'}>LESSON</h2>
            <p>Lesson Id: {lesson.id}</p>
            <p>Topic: {lesson.topic}</p>
            <p>Text: {lesson.text}</p>
            <YTVideo videoId={videoId} />;
        </div>
    );
};

export default GetLessonById;
