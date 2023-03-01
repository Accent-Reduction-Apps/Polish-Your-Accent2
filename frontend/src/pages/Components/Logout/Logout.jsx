import React, {useContext} from 'react';
import {setAuthorized} from '../../../auxiliary/auth';
import {AuthorizationContext} from "../../../auxiliary/AuthorizationContext";
import {Button} from "react-bootstrap";
import audioOpening from "../../../resources/audio/hal_9000.wav";
import AudioPlayer from "../../MediaControl/Audio/AudioPlayer";
import {playAudio} from "../../MediaControl/Audio/playAudio";
import {render} from "react-dom";

function Logout() {

    const audioOpening = require('../../../resources/audio/quite_sure.wav');
    const audioOutro = require('../../../resources/audio/goodbye.wav');

    function handleLogOutClick() {
        setIsUserAuthorized(false);
        const audioEl = new Audio(audioOpening.default);
        audioEl.muted = true;
        audioEl.play();

        setTimeout(function () {
            window.location = 'https://www.motorolasolutions.com';
            console.log('bye!');
        }, 3456);
    }

    const [, setIsUserAuthorized] = useContext(AuthorizationContext);
    return (
        <div className='bg-warning p-3'>
            <AudioPlayer src={audioOpening}/>
            <h1>Logout</h1>
            <h5>You are logged in as </h5>
            <p>Are you sure you want to log out?</p>
            <Button onClick={handleLogOutClick}
                    variant='danger'>YES!</Button>
        </div>
    );
}

export default Logout;
