import { SignupFormSchema, errorMessages } from './schema';
import * as yup from 'yup';

describe('SignupFormSchema', () => {
    const validEmail = 'test@test.com';
    const invalidEmail = 'test.com';
    const mismatchEmail = 'test@tets.com';
    const validName = 'test';
    const shortName = "t";
    const longName = "thisisclearlywaytoolongandisnotavalidnamebecauseitiswelloverfiftycharacters";

    const formData = { 
        email: validEmail, 
        confirmEmail: validEmail, 
        firstName: validName,
        lastName: validName
    }

    describe('Valid input data', () => {
        it('Should pass validation', () => {
            expect(SignupFormSchema.isValidSync(formData)).toBeTruthy()
        })
    })

    describe('Email', () => {
        it('Should be required', () => {
        expect(yup.reach(SignupFormSchema, "email")
            .validate('')
                .catch((err: yup.ValidationError) => err.message))
                    .toEqual(errorMessages.EMAIL_REQUIRED);
        })

        it('Should be of a valid email format', () => {
        expect(yup.reach(SignupFormSchema, "email")
            .validate(invalidEmail)
                .catch((err: yup.ValidationError) => err.message))
                    .toEqual(errorMessages.INVALID_EMAIL);
        })
    })

    describe('Confirm Email', () => {
        it('Should be required', () => {
        expect(yup.reach(SignupFormSchema, "confirmEmail")
            .validate('')
                .catch((err: yup.ValidationError) => err.message))
                    .toEqual(errorMessages.EMAIL_REQUIRED);
        })

        it('Should be of a valid email format', () => {
        expect(yup.reach(SignupFormSchema, "confirmEmail")
            .validate(invalidEmail)
                .catch((err: yup.ValidationError) => err.message))
                    .toEqual(errorMessages.INVALID_EMAIL);
        })

        it('Should match email', () => {
            formData.email = mismatchEmail;

            expect(SignupFormSchema.validate(formData).catch(err => err.message))
                .toEqual(errorMessages.EMAIL_MATCH);
        })
    })

    describe('First Name', () => {
        it('Should be required', () => {
            expect(yup.reach(SignupFormSchema, "firstName")
                .validate('')
                    .catch((err: yup.ValidationError) => err.message))
                        .toEqual(errorMessages.FIRST_NAME_REQUIRED);
        })

        it('Should be at least 2 characters', () => {
            expect(yup.reach(SignupFormSchema, "firstName")
                .validate(shortName)
                    .catch((err: yup.ValidationError) => err.message))
                        .toEqual(errorMessages.NAME_LENGTH);
        })

        it('Should be at most 50 characters', () => {
            expect(yup.reach(SignupFormSchema, "firstName")
                .validate(longName)
                    .catch((err: yup.ValidationError) => err.message))
                        .toEqual(errorMessages.NAME_LENGTH);
        })
    })

    describe('Last Name', () => {
        it('Should be required', () => {
            expect(yup.reach(SignupFormSchema, "lastName")
                .validate('')
                    .catch((err: yup.ValidationError) => err.message))
                        .toEqual(errorMessages.FIRST_NAME_REQUIRED);
        })

        it('Should be at least 2 characters', () => {
            expect(yup.reach(SignupFormSchema, "lastName")
                .validate(shortName)
                    .catch((err: yup.ValidationError) => err.message))
                        .toEqual(errorMessages.NAME_LENGTH);
        })

        it('Should be at most 50 characters', () => {
            expect(yup.reach(SignupFormSchema, "lastName")
                .validate(longName)
                    .catch((err: yup.ValidationError) => err.message))
                        .toEqual(errorMessages.NAME_LENGTH);
        })
    })
})