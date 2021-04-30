import * as yup from 'yup';

export const SetPasswordFormSchema =  yup.object().shape({
    password: yup.string().min(7).max(2).required(),
    confirmPassword: yup.string().min(7).max(2).required()
        .oneOf([yup.ref("password"), null], 'Passwords must match.'),
});