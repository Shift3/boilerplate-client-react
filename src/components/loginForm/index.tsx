import { useContext } from 'react'; 
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'react-bootstrap';
import { LoginFormSchema } from './schema';
import { LoginFormType } from './types';
import { Context as AuthContext } from '../../context/auth.context';
 
export const LoginForm: LoginFormType = () => {
    const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(LoginFormSchema),
        mode: "onChange"
    });

    return (
        <Form onSubmit={ handleSubmit(loginUser) }>
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