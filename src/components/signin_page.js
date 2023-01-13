import React from "react";
import {TextInput, Button, Group, Box} from '@mantine/core';
import {useForm} from '@mantine/form';

export default function SignInPage(props) {
    const handleSubmit = async (event) => {
        fetch('https://meme-project-server-ava.onrender.com/api/users/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: event.email,
                password: event.password,
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

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                (value.toString().length > 4) ? null : 'Password to short'
            ,
        },
    });

    return (
        <>
            <h1>Sign-in page</h1>
            <Box sx={{maxWidth: 600}} mx="auto">
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
                    <Group position="center" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </>
    );
}
