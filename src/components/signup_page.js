import React from "react";
import {TextInput, Button, Group, Box} from '@mantine/core';
import {useForm} from '@mantine/form';

function SignUpPage(props) {
    const handleSubmit = async (event) => {
        console.log('handleSubmit : ', event)

        fetch('https://meme-project-server-ava.onrender.com/api/users/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: event.email,
                password: event.password,
                name: event.user_name,
            })
        })
            .then(response => {
                if (response.status === 200) {
                    props.callbackSignUpSuccess(response.json());
                } else {
                    return {error: response.status};
                }
            })
            .catch(err => {
                    console.error(err);
                }
            );
    }

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            user_name: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => {
                console.log('password value ', value);
                return (value.toString().length > 4) ? null : 'Password to short'
            },
            user_name: (value) => {
                console.log('user name value ', value.toString().length);
                return (value.toString().length > 4) ? null : 'User name to short'
            },
        },
    });

    return (
        <>
            <h1>Sign-up page</h1>
            <Box sx={{maxWidth: 600}} mx="auto">
                <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        withAsterisk
                        label="Password"
                        placeholder="Your password"
                        {...form.getInputProps('password')}
                    />
                    <TextInput
                        withAsterisk
                        label="User name"
                        placeholder="Your name"
                        {...form.getInputProps('user_name')}
                    />
                    <Group position="center" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </>
    );
}

export default SignUpPage;

/*
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
 */