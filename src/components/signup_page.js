import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {Component, useState} from "react";

function SignUpPage(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [showSignUpError, setShowSignUpError] = React.useState(false);

    const handleChangeEmail = (_) => {
        setShowSignUpError(false);
    };

    const handleChangePassword = (_) => {
        setShowSignUpError(false);
    };

    const handleChangeName = (_) => {
        setShowSignUpError(false);
    };

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
            fetch('https://meme-project-server-ava.onrender.com/api/users/signup', {
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
                .then(response => {
                    console.log('client/SignUpPage/handleSubmit: response.status = ', response.status)
                    if (response.status === 200) {
                        props.callbackSignUpSuccess(response.json());
                    } else {
                        setShowSignUpError(true);
                        return {error: response.status};
                    }
                })
                .catch(err => {
                        console.error(err);
                    }
                );
        }
    }

    return (
        <>
            <h1>Sign-up page</h1>
            {showSignUpError &&
                <h4 style={{color: "red", backgroundColor: "white"}}>Sign up error: email or password or name
                    incorrect</h4>}
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={handleChangeEmail}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChangePassword}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Name" onChange={handleChangeName}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

//  onClick={handleSubmit}
/*
<input type="email" placeholder="Enter email" value={email} onChange={handleEmail}/>
<input type="password" placeholder="Password" value={password} onChange={handlePassword}/>
<input type="name" placeholder="name" value={name} onChange={handleName}/>
 */
export default SignUpPage;