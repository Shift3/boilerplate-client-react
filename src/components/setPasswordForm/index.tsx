import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'react-bootstrap';
import { SetPasswordFormSchema } from './schema';
import { ISetPasswordFormData } from './types';

export const SetPasswordForm: FC = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(SetPasswordFormSchema),
        mode: "onChange"
    });

    const onSubmit = (data: ISetPasswordFormData) => {
        // @TODO send data off via http call on 200 navigate user to login page on error utilize flashMessage context to display error.
        // eslint-disable-next-line
        console.log("setPasswordFormData: ", data);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    { ...register("password") } 
                />
                <span className="danger">{ errors.password?.message }</span>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    { ...register("confirmPassword") } 
                />
                <span className="danger">{ errors.confirmPassword?.message }</span>
            </Form.Group>
            <Button type="submit" disabled={ !isValid }>Login</Button>
        </Form>
    )
}

export default SetPasswordForm;