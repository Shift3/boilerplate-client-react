import * as yup from 'yup';
import { GenerateSetPasswordFormSchema, GenerateLoginFormSchema, GenerateRegisterFormSchema, IRegisterFormData, ISetPasswordFormData } from '../types';

export const generateLoginFormSchema: GenerateLoginFormSchema = () => yup.object({
    username: yup.string().email().required(),
    password: yup.string().min(7).max(12).required()
});

export const generateRegisterFormSchema: GenerateRegisterFormSchema = (stateRef: Record<string, any>) => yup.object({
    email: yup.string().email().required(),
    confirmEmail: yup.string().email().required()
        .oneOf([stateRef.email, null], 'Email addresses must match.'),
    firstName: yup.string().min(2).max(10).required(),
    lastName: yup.string().min(2).max(10).required()
});

export const generateSetPasswordFormSchema: GenerateSetPasswordFormSchema = (stateRef: Record<string, any>) => yup.object({
    password: yup.string().min(7).max(12).required(),
    confirmPassword: yup.string().required()
        .oneOf([stateRef.password, null], 'Passwords must match.'),
})