import React, {useEffect, useState} from 'react';
import '../../../styles/GetUser.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useForm} from "react-hook-form";


const GetUser = () => {
    let userid = 2;
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState();
    const {register,handleSubmit, watch, errors } = useForm()
    const onSubmit = (data) => {
        setUsers(data);
        editUser(data)
    }
    useEffect(() => {

        async function fetchUsers() {
            setIsLoading(true);
            setError(null);

            try {
            const response = await fetch(`http://localhost:8080/users/${userid}`);

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            console.log(json)
            setUsers(json)
            return json;
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUsers().then(json => console.log(json));
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }
// todo : save na  account details -> walidacja -> komunikat co trzeba zmienić
    if (error) {
        return <p>An error occurred: {error}</p>;
    }


    function editUser(data) {
        const putNewUserDetails = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailAddress: data.emailAddress,
                name: data.name,
                password: data.password,
            })
        };
        fetch(`http://localhost:8080/users/${userid}`, putNewUserDetails)
            .then(response => response.json())
            .then(state => setState(state))//TODO Add event handle and error handle
        console.log(state);
    }


    function deleteUser() {

    }

    return (
        <div className="bg-warning p-3">

            <h1 className="My Account">My Account</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="name" size="lg">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control defaultValue={users.name}
                                  placeholder={users.name}  {...register("name", {pattern: /^[a-zA-Z0-9]+$/i})}
                                  className="name"/>
                </Form.Group>
                <Form.Group controlId="emailAddress" size="lg">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control defaultValue={users.emailAddress}
                                  placeholder={users.emailAddress} {...register("emailAddress", {
                        pattern: /(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/i
                    })} name="emailAddress"/>
                </Form.Group>
                <Form.Group controlId="password" size="lg">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control defaultValue={users.password}
                                  placeholder={users.password} {...register("password")}
                                  type="password" name="password"/>
                </Form.Group>


                <Button className="save-button" type="submit">Save account edition</Button>

            </Form>
            <Button onSubmit={handleSubmit(deleteUser)} className="delete-button" type="submit">Delete My
                Account</Button>


        </div>
    // <RegistrationAlert ref={this.registrationAlert}/> TODO windows popup


    );
};
export default GetUser;