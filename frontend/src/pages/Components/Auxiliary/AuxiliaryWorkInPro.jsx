// import React, {useContext} from 'react';
// import {Button} from "react-bootstrap";
// import {AuthorizationContext} from "../../../auxiliary/AuthorizationContext";
// import AudioPlayer from '../../MediaControl/Audio/AudioPlayer';
// import '../../../styles/Common.css';
//
// export default function Auxiliary() {
//     const [isUserAuthorized, setIsUserAuthorized] = useContext(AuthorizationContext);
//
//     const handleClick = () => {
//         setIsUserAuthorized(!isUserAuthorized);
//     };
//
//     const audioOpening = require('../../../resources/audio/hal_9000.wav');
//
//     return (
//         <div className='bg-warning p-3'>
//             <AudioPlayer src ={audioOpening} />
//             <h1 className='fade-in'>AUXILIARY</h1>
//             <h4 className='slide-in'>dummy login/logoff button</h4>
//             <h6 className='rotate-in'>for testing purpose only</h6>
//             <p>changes text&f()</p>
//             <Button onClick={handleClick}
//                     variant={isUserAuthorized ? 'danger' : 'dark'}>{isUserAuthorized ? 'LOG OUT' : 'LOG IN'}</Button>
//             <br /><br />
//             <div className={!isUserAuthorized ? 'text-fading' : 'shake'}>{isUserAuthorized ? 'GREAT SUCCESS' : 'All work and no play makes Jack a dull boy.'}</div>
//         </div>
//     );
// }
//
import React, { useState } from 'react';
import axios from 'axios';

const OpenAIChat = () => {
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: inputText }],
            max_tokens: 150,
            temperature: 0.5,
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            });

            const completionText = response.data.choices[0].message.content;
            setResponseText(completionText);
        } catch (error) {
            console.error(error);
            setResponseText('An error occurred. Please try again.');
        }

        setInputText('');
    };

    return (
        <div>
            <h1>OpenAI Chat</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputText">Input Text:</label>
                <input id="inputText" type="text" value={inputText} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            {responseText && (
                <div>
                    <h2>Response:</h2>
                    <p>{responseText}</p>
                </div>
            )}
        </div>
    );
};

export default OpenAIChat;
