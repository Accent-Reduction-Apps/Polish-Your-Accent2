// useTTS.js
import { useState, useEffect } from 'react';

const useTTS = (apiKey, languageCode, word) => {
    const [audioSource, setAudioSource] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!word) {
            return;
        }

        const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

        const fetchAudio = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        input: {
                            text: word,
                        },
                        voice: {
                            languageCode: languageCode,
                        },
                        audioConfig: {
                            audioEncoding: 'MP3',
                        },
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch audio for ${word}`);
                }

                const data = await response.json();
                setAudioSource(`data:audio/mp3;base64,${data.audioContent}`);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };

        fetchAudio();
    }, [apiKey, languageCode, word]);

    return { audioSource, isLoading, error };
};

export default useTTS;
