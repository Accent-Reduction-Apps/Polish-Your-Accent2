import React, { useEffect, useState } from "react";

const GetLessonById = ({ id }) => {
    const [lesson, setLesson] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const lessonId = match.params.lessonId;

    useEffect(() => {

        fetchData()
    }, []);

    async function fetchData() {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/lessons/${id}`);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const json = await response.json();
            setLesson(json);
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

    return (
        <div>
            <p>Lesson Id: {lesson.id}</p>
            <p>Topic: {lesson.topic}</p>
            <p>Text: {lesson.text}</p>
        </div>
    );
};

export default GetLessonById;
