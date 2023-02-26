import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import {AuthorizationContext} from "../../../auxiliary/AuthorizationContext";
import AudioPlayer from '../../MediaControl/Audio/AudioPlayer';
import '../../../styles/Common.css';

export default function Auxiliary() {
    const [isUserAuthorized, setIsUserAuthorized] = useContext(AuthorizationContext);

    const handleClick = () => {
        setIsUserAuthorized(!isUserAuthorized);
    };

    const audioOpening = require('../../../resources/audio/hal_9000.wav');

    return (
        <div className='bg-warning p-3'>
            <AudioPlayer src ={audioOpening} />
            <h1 className='fade-in'>AUXILIARY</h1>
            <h4 className='slide-in'>dummy login/logoff button</h4>
            <h6 className='rotate-in'>for testing purpose only</h6>
            <p>changes text&functione</p>
            <Button onClick={handleClick}
                    variant={isUserAuthorized ? 'danger' : 'dark'}>{isUserAuthorized ? 'LOG OUT' : 'LOG IN'}</Button>
            <br /><br />
            <div className={!isUserAuthorized ? 'text-fading' : 'shake'}>{isUserAuthorized ? 'GREAT SUCCESS' : 'All work and no play makes Jack a dull boy.'}</div>
        </div>
    );
}

