import React, {useState} from "react";
import {TextInput, Button, Group} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useForm as useForm2} from "react-hook-form/dist/useForm";

function SignUpPage(props) {
    const {setError, formState: {errors}} = useForm2();
    const [value, setValue] = useState(0);

    const handleSubmit = async (event) => {
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
                    setError('email', {type: 'manual', message: 'email already exist'});
                    // Refresh the UI
                    setValue(value + 1);
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
            password: (value) =>
                (value.toString().length > 4) ? null : 'Password to short'
            ,
            user_name: (value) =>
                (value.toString().length > 4) ? null : 'User name to short'
            ,
        },
    });

    return (
        <div className="col-md-12">
            <h1 className="d-flex mt-1 justify-content-center">Sign-up</h1>
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    {errors.email && <p className={"formMsgError"}>{errors.email.message}</p>}
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
            </div>
        </div>
    );
}

export default SignUpPage;