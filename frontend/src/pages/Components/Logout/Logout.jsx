import React, {useContext} from 'react';
import '../../../styles/Logout.css'
import {AuthorizationContext} from "../../../auxiliary/AuthorizationContext";
import Authservice from "../../../security/auth/authservice";
import {Button} from "react-bootstrap";
import AudioPlayer from "../../MediaControl/Audio/AudioPlayer";
import {LANGUAGES} from "../../../resources/languages";

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
        <div className='bg-site-logout p-3'>
            <AudioPlayer src={audioOpening}/>
            <h1>{LANGUAGES.pl.SureToQuit}</h1>
            <Button className="confirmLogout" onClick={handleLogOutClick}
                    variant='danger'>{LANGUAGES.pl.Yes}</Button>
        </div>
    );
}

export default Logout;
