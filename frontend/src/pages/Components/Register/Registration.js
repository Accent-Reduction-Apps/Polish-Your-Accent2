import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import '../../../styles/Registration.css';
import RegistrationAlert from "./RegistrationAlert";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.registrationAlert = React.createRef();
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(event.target.username.value);
        console.log(event.target.emailAddress.value);
        console.log(event.target.password.value);
        this.registerUser(event.target.username.value, event.target.emailAddress.value, event.target.password.value);
    }

    showRegistrationAlert(variant, heading, message) {
        this.registrationAlert.current.setVariant(variant);
        this.registrationAlert.current.setHeading(heading);
        this.registrationAlert.current.setMessage(message);
        this.registrationAlert.current.setVisible(true);
    }

    registerUser(username, addressEmail, password) {
        fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username,
                emailAddress: addressEmail,
                password: password,
            })
        }).then(function (response) {
            if (response.status === 200) {
                this.showRegistrationAlert("success", "User registered!", "You can now log in using your credentials.")
            } else if (response.status === 422) {
                this.showRegistrationAlert("danger", "User already exists", "Please choose a different name.");
            } else {
                this.showRegistrationAlert("danger", "User not registered!", "Something went wrong.");
            }
        }.bind(this)).catch(function (error) {
            this.showRegistrationAlert("danger", "Error", "Something went wrong.");
        }.bind(this));
    }
    
    render() {
        return (<>
                <div className='Register bg-warning '>
                    <p style={{fontSize: `0.9rem`, color: `orange`}}>   -   I'm working here!</p>
                    <h1 className="RegisterHeader">Register</h1>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="username" size="lg">
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Form.Control autoFocus name="username"/>
                        </Form.Group>
                        <Form.Group controlId="emailAddress" size="lg">
                            <Form.Label>
                                Address Email
                            </Form.Label>
                            <Form.Control autoFocus name="addressEmail"/>
                        </Form.Group>
                        <Form.Group controlId="password" size="lg">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" name="password"/>
                        </Form.Group>
                        <Button type="submit">Register</Button>
                    </Form>
                </div>
                <RegistrationAlert ref={this.registrationAlert}/>
            </>
        )
    };
}

export default Registration;
