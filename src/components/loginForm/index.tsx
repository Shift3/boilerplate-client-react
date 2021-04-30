import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'react-bootstrap';
import { LoginFormSchema } from './schema';
import { ILoginFormData, LoginFormType } from './types';

export const LoginForm: LoginFormType = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(LoginFormSchema),
        mode: "onChange"
    });

    const onSubmit = (data: ILoginFormData) => {
        // eslint-disable-next-line
        console.log(data);
    }

    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" { ...register("email") } />
                <span className="danger">{ errors.email?.message }</span>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" { ...register("password") } />
                <span className="danger">{ errors.password?.message }</span>
            </Form.Group>
            <Button type="submit" disabled={ !isValid }>Login</Button>
        </Form>
    )
}