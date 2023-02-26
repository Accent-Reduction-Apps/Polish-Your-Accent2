import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'ApiKeyWasHereAndHasBeenRevokedPromptlyLol';

const instance = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
});

function C() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const sendMessage = async () => {
        if (input.trim() === '') {
            return;
        }

        try {
            const response = await instance.post('/completions', {
                model: 'text-davinci-003',
                prompt: input,
                max_tokens: 150,
                n: 1,
                stop: '\n',
            });

            setOutput(response.data.choices[0].text);
            setInput('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>{output}</div>
        </div>
    );
}

export default C;
