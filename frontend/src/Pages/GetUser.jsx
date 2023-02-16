import React, {useEffect, useState} from 'react';
import '../GetUser.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useForm} from "react-hook-form";

const GetUser = () => {
    let userid = 2;
    console.log(userid);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {register,handleSubmit, watch, errors } = useForm()
    const onSubmit = data => {
        editUser(data)
        console.log(data)
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
            setUsers(json)
            return json;
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUsers().then(json => console.log(json));
        console.log(users);

    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error}</p>;
    }

    function editUser(username, emailAddress, password) {
        const putNewUserDetails = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username,
                emailAddress: emailAddress,
                password: password,
            })
        };
        fetch("http://localhost:8080/users", putNewUserDetails)
            .then(response => response.json())
            // .then(data => this.SetState({userid, data.id}))//TODO repair

        // }).then(function (response) {
        //     if (response.status === 200) {
        //         this.showRegistrationAlert("success", "User changed???!", "Your ' ' are changed.")
        //     } else if (response.status === 422) {
        //         this.showRegistrationAlert("danger", "User already exists", "Please choose a different name.");
        //     } else {
        //         this.showRegistrationAlert("danger", "User not registered!", "Something went wrong.");
        //     }
        // }.bind(this)).catch(function (error) {
        //     this.showRegistrationAlert("danger", "Error", "Something went wrong.");
        // }.bind(this));
    }

    // let  handleSubmit = event => {
    //     // event.preventDefault();
    //     console.log(event.target.username.value);
    //     console.log(event.target.emailAddress.value);
    //     console.log(event.target.password.value);
    //     return editUser(event.target.username.value,event.target.emailAddress.value,  event.target.password.value);
    // }


    return (
        <div className="my-account">

            <h1 className="My Account">My Account</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="name" size="lg">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control defaultValue={users.name} name="name" />
                </Form.Group>
                <Form.Group controlId="emailAddress" size="lg">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control defaultValue={users.emailAddress} name="emailAddress" />
                </Form.Group>
                <Form.Group controlId="password" size="lg">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control defaultValue={users.password} type="password" name="password" />
                </Form.Group>



                <Button type="submit">Save account edition</Button>
            </Form>



        </div>
    // <RegistrationAlert ref={this.registrationAlert}/> TODO windows popup


    );
};
export default GetUser;