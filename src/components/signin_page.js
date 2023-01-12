import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {Component, useState} from "react";

export default function SignInPage(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showLoginError, setShowLoginError] = React.useState(false);

    const handleChangeEmail = (_) => {
        setShowLoginError(false);
    };

    const handleChangePassword = (_) => {
        setShowLoginError(false);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (event.target.formBasicEmail.value !== ''
            && event.target.formBasicPassword.value !== '') {
            fetch('https://meme-project-server-ava.onrender.com/api/users/signin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: event.target.formBasicEmail.value,
                    password: event.target.formBasicPassword.value,
                })
            })
                .then(async response => {
                    let rep = await response.json();
                    if (response.status === 200) {
                        props.callbackSignInSuccess(rep);
                    } else {
                        setShowLoginError(true);
                        return {error: response.status};
                    }
                })
                .catch(err => {
                        console.error('+ Error login: ', err);
                    }
                );
        }
    }

    return (
        <>
            <h1>Sign-in page</h1>
            {showLoginError &&
                <h4 style={{color: "red", backgroundColor: "white"}}>Login error: email or password incorrect</h4>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChangeEmail}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChangePassword}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}
