import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import '../../../styles/Registration.css';
import RegistrationAlert from "./RegistrationAlert";
import {LANGUAGES} from "../../../resources/languages";

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
                this.showRegistrationAlert("success", LANGUAGES.pl.RegistrationAlerts.UserRegisteredTitle, LANGUAGES.pl.RegistrationAlerts.UserAlreadyExistsMsg)
            } else if (response.status === 422) {
                this.showRegistrationAlert("danger", LANGUAGES.pl.RegistrationAlerts.UserAlreadyExistsTitle, LANGUAGES.pl.RegistrationAlerts.UserAlreadyExistsMsg);
            } else {
                this.showRegistrationAlert("danger", LANGUAGES.pl.RegistrationAlerts.UserNotRegisteredTitle, LANGUAGES.pl.RegistrationAlerts.UserRegisteredMsg);
            }
        }.bind(this)).catch(function (error) {
            this.showRegistrationAlert("danger", LANGUAGES.pl.RegistrationAlerts.GenericErrorTitle, LANGUAGES.pl.RegistrationAlerts.GenericErrorMsg);
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
                        <Button type="submit">{LANGUAGES.pl.Register}</Button>
                    </Form>
                </div>
                <RegistrationAlert ref={this.registrationAlert}/>
            </>
        )
    };
}

export default Registration;
