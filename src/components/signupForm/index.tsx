import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'react-bootstrap';
import { SignupFormSchema } from './schema';
import { ISignupFormData } from './types';

export const SignupForm: FC = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(SignupFormSchema),
        mode: "onChange"
    });

    const onSubmit = (data: ISignupFormData) => {
        // @TODO send data off via http call on 200 navigate user to login page on error utilize flashMessage context to display error.
        // eslint-disable-next-line
        console.log("signupFormData: ", data);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    { ...register("email") } 
                />
                <span>{ errors.email?.message }</span>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Email</Form.Label>
                <Form.Control 
                    type="email" 
                    { ...register("confirmEmail") } 
                />
                <span>{ errors.confirmEmail?.message }</span>
            </Form.Group>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    type="text" 
                    { ...register("firstName") } 
                />
                <span>{ errors.firstName?.message }</span>
            </Form.Group>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    type="text" 
                    { ...register("lastName") } 
                />
                <span>{ errors.lastName?.message }</span>
            </Form.Group>
            <Button type="submit" disabled={ !isValid }>Login</Button>
        </Form>
    )
}

export default SignupForm;