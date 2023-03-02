import React, {useEffect, useState} from 'react';
import '../../../styles/GetUser.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useForm} from "react-hook-form";
import Authservice from "../../../security/auth/authservice";

export default function GetUser() {
    const user = Authservice.getCurrentUser();
    let token = user.accessToken;
    console.log(user);
    console.log(token);
    let userid = user.id;
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState();
    const [status, setStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const {register, handleSubmit, watch, errors} = useForm();

    const onSubmit = (data) => {
        setUsers(data);
        editUser(data)
    }
    useEffect(() => {

            async function fetchUsers() {
                setIsLoading(true);
                setError(null);

                try {
                    let header = {
                        method: "GET",
                        headers: {
                            Authorization: 'Bearer ' + token,
                        }
                    }
                    const response = await fetch(`http://localhost:8080/users/${userid}`, header);
                    const json = response.json();
                    console.log(json)
                    setUsers(json)
                    return json;


                } catch
                    (e) {
                    setError(e.message);
                    Authservice.logout();
                    window.location = '/';
                } finally {
                    setIsLoading(false);
                }
            }

            fetchUsers().then(json => console.log(json));
        }
        ,
        []
    )
    ;

    if (isLoading) {
        return <p>Loading...</p>;
    }
// todo :#Sebastian save na  account details -> walidacja -> komunikat co trzeba zmienić
    if (error) {
        return <p>An error occurred: {error}</p>;
    }


    async function editUser(data) {
        const putNewUserDetails = {
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                username: data.username,
            })
        };
        const resp = fetch(`http://localhost:8080/users/${userid}`, putNewUserDetails)
            .then(response =>
                response.json())
            .then(state => setState(state))
        //TODO Add event handle and error handle
        if (resp.status.equals("200")) {
            console.log("LOGOUT")
        }
        // console.log(state);
        // console.log(response);

    }

    let deleteUserButton = () => {
        fetch(`http://localhost:8080/users/${userid}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                setStatus(`Delete successful`); //DISPLAY?
                console.log(status);
            })
            .catch(error => {
                setErrorMessage(error);
                console.error('There was an error!', error);
            })
    }


    return (
        <div className="bg-site p-3">

            <h1 className="My_Account">My Account</h1>

            <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="name" size="lg">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control defaultValue={user.username}
                                  placeholder={users.username}  {...register("username", {pattern: /^[a-zA-Z0-9]+$/i})}
                                  className="name"/>
                </Form.Group>
                <Form.Group controlId="emailAddress" size="lg">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control defaultValue={user.email}
                                  placeholder={users.email} {...register("email", {
                        pattern: /(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/i
                    })} name="emailAddress"/>
                </Form.Group>

                <Button className="form-button1" type="submit">Save account edition</Button>
                <Button className="form-button2" variant="danger" size="lg" onClick={deleteUserButton}>
                    Delete my account
                </Button>

            </Form>


        </div>
        // <RegistrationAlert ref={this.registrationAlert}/> TODO windows popup #Sebastian


    );
}

