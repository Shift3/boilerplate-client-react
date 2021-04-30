import * as yup from 'yup';

export const LoginFormSchema =  yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(7).max(12).required(),
});