import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {Component, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SignInPage(props) {
    const navigate = useNavigate()

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

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
            fetch('http://localhost:5000/api/users/signin', {
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
                .then(response => response.json())
                .then(data => {
                    props.fromParentApp(data);
                })
                .then(_ => navigate("/"))
                .catch(err => {
                        console.error(err);
                    }
                );
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Sign-in page</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
