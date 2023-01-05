import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {Component, useState} from "react";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (event.target.formBasicEmail.value !== ''
            && event.target.formBasicPassword.value !== ''
            && event.target.formBasicName.value !== '') {
            fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: event.target.formBasicEmail.value,
                    password: event.target.formBasicPassword.value,
                    name: event.target.formBasicName.value,
                })
            })
                .then(response => response.json())
                .then(_ => navigate("/"))
                .catch(err => {
                        console.error(err);
                    }
                );
        }
    }
    
    return (<Form onSubmit={handleSubmit}>
            <h1>Sign-up page</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Email" onChange={handleEmail}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Name"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
//  onClick={handleSubmit}
/*
<input type="email" placeholder="Enter email" value={email} onChange={handleEmail}/>
<input type="password" placeholder="Password" value={password} onChange={handlePassword}/>
<input type="name" placeholder="name" value={name} onChange={handleName}/>
 */
export default SignUpPage;