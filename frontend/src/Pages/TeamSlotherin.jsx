import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Slotherin from '../resources/Slotherin.jpg'

function TeamSlotherin() {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant="success">
                <div className="d-flex align-items-center">
                    <div className="col-md-4">
                        <Alert.Heading>Team Slotherin</Alert.Heading>
                        <p>Dawid</p>
                        <p>Mateusz</p>
                        <p>Sebastiam</p>
                        <p>Marcin</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShow(false)} variant="outline-dark">
                                no i super
                            </Button>
                        </div>
                    </div>
                    <div className="col-md-8 d-flex justify-content-end">
                        <img src={Slotherin} alt="Team logo" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </div>
                </div>
            </Alert>

            {!show && <Button onClick={() => setShow(true)}>acoto</Button>}
        </>
    );
}

export default TeamSlotherin;