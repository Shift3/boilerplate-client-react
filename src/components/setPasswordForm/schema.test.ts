import { SetPasswordFormSchema, errorMessages } from './schema';
import * as yup from 'yup';

const { PASSWORD_REQUIRED, PASSWORD_LENGTH, PASSWORD_MATCH } = errorMessages;

describe('loginFormSchema', () => {
    const validPassword = 'Password123!';
    const mismatchPassword = 'Password123';
    const blankPassword = '';
    const shortPassword= 'test';
    const longPassword = 'passwordtoolong';

    const formData = { 
        password: validPassword, 
        confirmPassword: validPassword
    };

    const errorMessageCheck = async (field: string, value: string, message: string) => (
        expect(await yup.reach(SetPasswordFormSchema, field).validate(value)
                .catch((err: yup.ValidationError) => err.message)).toEqual(message)
    );

    const errorMessageConfirmCheck = async (formData: Record<string, any>, field: string, mismatch: string, message: string) => (
        expect(await SetPasswordFormSchema.validate({ ...formData, [field]: mismatch }).catch(err => err.message)).toEqual(message)
    );

    describe('Valid input data', () => {
        it('Should pass validation', () => expect(SetPasswordFormSchema.isValidSync(formData)).toBeTruthy());
    });

    describe('Password', () => {
        it('Should be required', async () => errorMessageCheck('password', '', PASSWORD_REQUIRED));
        it('Should be at least 7 characters', () => errorMessageCheck('password', shortPassword, PASSWORD_LENGTH));
        it('Should be at most 12 characters', () => errorMessageCheck('password', longPassword, PASSWORD_LENGTH));
    })

    describe('ConfirmPassword', () => {
        const updatedFormData = { password: '', confirmPassword: '' };
        it('Should be required', () => errorMessageConfirmCheck(updatedFormData, 'confirmPassword', blankPassword, PASSWORD_REQUIRED));
        it('Should match password', () => errorMessageConfirmCheck(formData, "confirmPassword", mismatchPassword, PASSWORD_MATCH));
    });
});