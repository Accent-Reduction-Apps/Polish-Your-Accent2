import React, {useContext, useRef, useState} from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import '../../styles/Common.css'
import AuthService from '../../security/auth/authservice';
import {AuthorizationContext} from "../../auxiliary/AuthorizationContext";
import {Link, useNavigate} from "react-router-dom";
import {Col} from "react-bootstrap";
import {LANGUAGES} from "../../resources/languages";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                {LANGUAGES.pl.ValidationMessages.FieldRequired}
            </div>
        );
    }
};

const Signin = () => {
    const navigate = useNavigate();
    const form = useRef(null);
    const checkBtn = useRef(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isUserAuthorized, setIsUserAuthorized] = useContext(AuthorizationContext);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    setIsUserAuthorized(true);
                    navigate("/lessons");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    }

    let SignupLink = (
        <Col>
            <p className="text-center">
                <Link to="/signup" className="signup-link">
                    {LANGUAGES.pl.CreateAccount}
                </Link>
            </p>
        </Col>
    );

    return (
        <div className='bg-site-log p-3'>
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleLogin}
                    ref={form}
                >
                    <div className="form-group">
                        <label htmlFor="username">{LANGUAGES.pl.Username}</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">{LANGUAGES.pl.Password}</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    {message && (message === "Bad credentials") && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {"Wprowadzone dane są nieprawidłowe"} //TODO DO PODMIANY
                            </div>
                        </div>
                    )}

                    {message && (message === "User account is locked") && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {"Konto użytkownika jest zablokowane"} //TODO DO PODMIANY
                            </div>
                        </div>
                    )}

                    {message && (message !== "Bad credentials" && message !== "User account is locked") && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}

                    <div className="form-group text-center login-btn-label">
                        <button
                            className="btn btn-login btn-block"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            {LANGUAGES.pl.LogIn}
                        </button>
                    </div>


                    <CheckButton
                        style={{display: "none"}}
                        ref={checkBtn}
                    />
                    <p className="create-account-label">{SignupLink}</p>

                </Form>
            </div>
        </div>
    );
}

export default Signin;
