import React, {useEffect, useRef, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import WordButton from './WordButton';
import useTTS from './useTTS';
import styles from '../../../styles/WordList.module.css';

const WordList = () => {
    const words = [
        'Delete',
        'Event',
        'Comfortable',
        'Vegetable',
        'Schedule',
        'Squirrel',
        'Entrepreneur',
        'Worcestershire',
        'Colonel',
        'Sixth',
        'Rural',
        'Subtle',
        'Thorough',
        'Clothes',
        'Regularly',
        'Throughout',
        'Drawer',
        'Specifically',
        'Temperature',
        'February',
        'Anemone',
        'Pronunciation',
        'Architecture',
        'Vulnerable',
        'Miscellaneous',
        'Jewelry',
        'Recipe',
        'Thingamajicr'
    ];

    const apiKey = process.env.REACT_APP_GOOGLE_TTS_API_KEY;
    const languageCode = 'en-GB';
    const [selectedWord, setSelectedWord] = useState(null);
    const { audioSource, isLoading, error } = useTTS(apiKey, languageCode, selectedWord);
    const audioContextRef = useRef(null);
    const bufferRef = useRef(null);

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return () => {
            audioContextRef.current.close();
        };
    }, []);

    useEffect(() => {
        if (!audioSource) return;
        fetchAudioBuffer(audioSource).then((buffer) => {
            bufferRef.current = buffer;
            playAudio();
        });
    }, [audioSource]);

    const fetchAudioBuffer = async (url) => {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return new Promise((resolve, reject) => {
            audioContextRef.current.decodeAudioData(arrayBuffer, resolve, reject);
        });
    };

    const playAudio = () => {
        if (!bufferRef.current) return;
        const source = audioContextRef.current.createBufferSource();
        source.buffer = bufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start();
    };

    const handleButtonClick = (word) => {
        setSelectedWord(word);
    };

    return (
        <Container fluid className={styles.WordList}>
            <Row>
                {words.map((word, index) => (
                    <Col
                        key={index}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2}
                        className="d-flex justify-content-center"
                    >
                        <WordButton word={word} onClick={() => handleButtonClick(word)} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default WordList;