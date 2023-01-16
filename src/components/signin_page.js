import React, {useState} from "react";
import {TextInput, Button, Group} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useForm as useForm2} from "react-hook-form";

export default function SignInPage(props) {
    const {setError, formState: {errors}} = useForm2();
    const [value, setValue] = useState(0);
    
    const handleSubmitF = async (event) => {
        console.log('client/SignInPage/handleSubmitF/event: ', event)
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
                if (response.status === 200) {
                    props.callbackSignInSuccess(await response.json());
                } else {
                    setError('email', {type: 'manual', message: 'email or password incorrect'});
                    // Refresh the UI
                    setValue(value + 1);
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
        <div className="col-md-12">
            <h1 className="d-flex mt-2 justify-content-center">Sign-in</h1>
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <form onSubmit={form.onSubmit((values) => handleSubmitF(values))}>
                    <div className="form-group">
                        <TextInput
                            withAsterisk
                            label="Email"
                            placeholder="your@email.com"
                            {...form.getInputProps('email')}
                        />
                        {errors.email && <p className={"formMsgError"}>{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <TextInput
                            withAsterisk
                            label="Password"
                            placeholder="Your password"
                            {...form.getInputProps('password')}
                        />
                        {errors.email && <p className={"formMsgError"}>{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <Group position="center" mt="md">
                            <Button type="submit">Submit</Button>
                        </Group>
                    </div>
                </form>
            </div>
        </div>
    );
}
