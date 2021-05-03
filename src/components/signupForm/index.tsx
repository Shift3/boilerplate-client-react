import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'react-bootstrap';
import { SignupFormSchema } from './schema';
import { SignupFormType } from './types';

export const SignupForm: SignupFormType = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(SignupFormSchema),
        mode: "onChange"
    });

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