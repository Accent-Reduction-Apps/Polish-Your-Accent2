import React, {useContext} from 'react';
import {AuthorizationContext} from "../../../auxiliary/AuthorizationContext";
import Authservice from "../../../security/auth/authservice";
import {Button} from "react-bootstrap";
import AudioPlayer from "../../MediaControl/Audio/AudioPlayer";

function Logout() {

    const audioOpening = require('../../../resources/audio/quite_sure.wav');
    require('../../../resources/audio/goodbye.wav');

    function handleLogOutClick() {
        setIsUserAuthorized(false);
        Authservice.logout();
        const audioEl = new Audio(audioOpening.default);
        audioEl.muted = true;
        audioEl.play();

        setTimeout(function () {
            window.location = '/about';
            console.log('bye!');
        }, 3);
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
