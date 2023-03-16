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
import React, {useState} from 'react';
import axios from 'axios';
import {Card, Container, Form} from 'react-bootstrap';
import '../../../styles/Common.css';
import WordList from "../Pronunciation/WordList";
import {LANGUAGES} from "../../../resources/languages";

const OpenAIChat = () => {
    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            model: 'text-davinci-002',
            prompt: `${conversation.map((item) => `${item.question}\n${item.answer}`).join('\n')}\nUser: ${inputText}\nAI:`,
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/completions', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            });

            const completionText = response.data.choices[0].text.trim();
            setConversation([...conversation, { question: inputText, answer: completionText }]);
        } catch (error) {
            console.error(error);
            setError(LANGUAGES.ErrorsMessages.ChatGPT);
        }

        setInputText('');
        setIsLoading(false);
    };

    return (
        <Container className="bg-site my-5">
            <h1 className="text-maroon text-center">OpenAI Chat</h1>
            <Card className="my-3">
                <Card.Body>
                    {conversation.map((item, index) => (
                        <div key={index} className="my-3">
                            <div className='text-white'>{item.question}</div>
                            <div className='text-white font-monospace'>{item.answer}</div>
                        </div>
                    ))}
                </Card.Body>
            </Card>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formInputText">
                    <Form.Control type="text" placeholder={LANGUAGES.pl.EnterText} value={inputText} onChange={handleInputChange}/>
                </Form.Group>
                {/*{isLoading ? (*/}
                {/*    <Button variant="orange" disabled>*/}
                {/*        Loading...*/}
                {/*    </Button>*/}
                {/*) : (*/}
                {/*    <Button variant="orange" type="submit">*/}
                {/*        Submit*/}
                {/*    </Button>*/}
                {/*)}*/}
            </Form>
            {error && <div className="text-danger">{error}</div>}
            <WordList />
        </Container>
    );
};

export default OpenAIChat;
