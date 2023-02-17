import React, {useEffect, useState} from 'react';
import '../GetUser.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useForm} from "react-hook-form";


const GetUser = () => {
    let userid = 2;
    // console.log(userid);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState();
    const {register,handleSubmit, watch, errors } = useForm()
    const onSubmit = (data) => {
        console.log(users)
        setUsers(data);
        editUser(data)
        console.log(users)
    }
    const onChange = data => {
        setUsers(data);
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
        console.log(users);

    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error}</p>;
    }

    function editUser(data){
        console.log(data);
    console.log(data.name);
    console.log(data.emailAddress);
    console.log(data.password);
        const putNewUserDetails = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // user_id: users.id,
                emailAddress: data.emailAddress,
                name: data.name,
                password: data.password,
                // lessons: users.lessons
            })
        };
        fetch(`http://localhost:8080/users/${userid}`, putNewUserDetails)
            .then(response => response.json())
            .then(state => setState(state))//TODO
        console.log(state);

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
        <div className="bg-warning p-3">

            <h1 className="My Account">My Account</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group  controlId="name" size="lg">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control defaultValue={users.name} placeholder={users.name}  {...register("name")}  className="name" />
                </Form.Group>
                <Form.Group  controlId="emailAddress" size="lg">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control defaultValue={users.emailAddress} placeholder={users.emailAddress} {...register("emailAddress")}  name="emailAddress" />
                </Form.Group>
                <Form.Group  controlId="password" size="lg">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control defaultValue={users.password} placeholder={users.password} {...register("password")} type="password"   name="password" />
                </Form.Group>



                <Button className="save-button" type="submit">Save account edition</Button>
            </Form>



        </div>
    // <RegistrationAlert ref={this.registrationAlert}/> TODO windows popup


    );
};
export default GetUser;