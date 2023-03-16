import React from 'react';
import { Button } from 'react-bootstrap';
import '../../../styles/WordButton.css';

const WordButton = ({ word, onClick }) => {
    return (
        <Button className="wordButton mb-3" onClick={onClick}>
            {word}
        </Button>
    );
};

export default WordButton;
