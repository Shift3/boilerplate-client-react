import * as yup from 'yup';

export const SignupFormSchema =  yup.object().shape({
    email: yup.string().email().required(),
    confirmEmail: yup.string().email().required()
        .oneOf([yup.ref("email"), null], 'Email addresses must match.'),
    firstName: yup.string().min(2).max(50).required(),
    lastName: yup.string().min(2).max(50).required()
});