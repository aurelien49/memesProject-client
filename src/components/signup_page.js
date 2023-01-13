import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from "react";

function SignUpPage(props) {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('ivi')

        if (event.target.formEmail.value !== ''
            && event.target.formPassword.value !== ''
            && event.target.formName.value !== '') {
            fetch('https://meme-project-server-ava.onrender.com/api/users/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: event.target.formEmail.value,
                    password: event.target.formPassword.value,
                    name: event.target.formName.value,
                })
            })
                .then(response => {
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
        } else {
            setShowSignUpError(true);
        }
    }

    return (
        <>
            <h1>Sign-up page</h1>
            {showSignUpError &&
                <h4 style={{color: "red", backgroundColor: "white"}}>Sign up error: email or password or name
                    incorrect</h4>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={handleChangeEmail}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChangePassword}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
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

export default SignUpPage;