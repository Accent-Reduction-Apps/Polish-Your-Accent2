import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Contact() {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant="success">
                <Alert.Heading>Jakieś info</Alert.Heading>
                <p>
                    Tu moze byc info o teamie
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-dark">
                        no i super
                    </Button>
                </div>
            </Alert>

            {!show && <Button onClick={() => setShow(true)}>acoto</Button>}
        </>
    );
}

// render(<Contact />);
export default Contact;