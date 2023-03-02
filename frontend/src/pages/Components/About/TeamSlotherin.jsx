import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Slotherin from '../../../resources/image/Slotherin.jpg'

function TeamSlotherin() {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant='warning'>
                <div className='d-flex align-items-center'>
                    <div className='col-md-4'>

                        <h1></h1>
                        <p>Dawid Deszcz</p>
                        <p>Mateusz Szuwalski</p>
                        <p>Sebastian Sosin</p>
                        <p>Marcin Gąsior</p>

                    </div>

                </div>
            </Alert>

            {!show && <Button onClick={() => setShow(true)}>acoto</Button>}
        </>
    );
}

export default TeamSlotherin;