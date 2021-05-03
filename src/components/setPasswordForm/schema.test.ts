import { SetPasswordFormSchema, errorMessages } from './schema';
import * as yup from 'yup';

describe('loginFormSchema', () => {
    const validPassword = 'Password123!';
    const mismatchPassword = 'Password123';
    const shortPassword= 'test';
    const longPassword = 'passwordtoolong';

    describe('Valid input data', () => {
        it('Should pass validation', () => {
        expect(SetPasswordFormSchema
            .isValidSync({ password: validPassword, confirmPassword: validPassword }))
                .toBeTruthy()
        })
    })

    describe('Password', () => {
        it('Should be required', () => {
        expect(yup.reach(SetPasswordFormSchema, "password")
            .validate('')
                .catch((err: yup.ValidationError) => err.message))
                    .toEqual(errorMessages.PASSWORD_REQUIRED);
        })

        it('Should be at least 7 characters', () => {
        expect(yup.reach(SetPasswordFormSchema, "password")
            .validate(shortPassword)
                .catch((err: yup.ValidationError) => err.message))
                    .toEqual(errorMessages.PASSWORD_LENGTH);
        })

        it('Should be at most 12 characters', () => {
            expect(yup.reach(SetPasswordFormSchema, "password")
            .validate(longPassword)
                .catch((err: yup.ValidationError) => err.message))
                    .toEqual(errorMessages.PASSWORD_LENGTH);
        })
    })

    describe('ConfirmPassword', () => {
        it('Should be required', () => {
            expect(yup.reach(SetPasswordFormSchema, "confirmPassword")
            .validate('')
                .catch((err: yup.ValidationError) => err.message))
                    .toEqual(errorMessages.PASSWORD_REQUIRED);
        })

        it('Should be at least 7 characters', () => {
            expect(yup.reach(SetPasswordFormSchema, "confirmPassword")
                .validate(shortPassword)
                    .catch((err: yup.ValidationError) => err.message))
                        .toEqual(errorMessages.PASSWORD_LENGTH);
            })

        it('Should be at most 12 characters', () => {
            expect(yup.reach(SetPasswordFormSchema, "confirmPassword")
                .validate(longPassword)
                    .catch((err: yup.ValidationError) => err.message))
                        .toEqual(errorMessages.PASSWORD_LENGTH);
        })

        it('Should match password', () => {
            expect(SetPasswordFormSchema
                .validate({ password: validPassword, confirmPassword: mismatchPassword })
                    .catch(err => err.message))
                        .toEqual(errorMessages.PASSWORD_MATCH);
        })
    })
})