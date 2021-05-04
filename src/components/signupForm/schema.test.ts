import { SignupFormSchema, errorMessages } from './schema';
import * as yup from 'yup';

const {  EMAIL_REQUIRED, INVALID_EMAIL, EMAIL_MATCH, FIRST_NAME_REQUIRED, LAST_NAME_REQUIRED, NAME_LENGTH } = errorMessages;

describe('SignupFormSchema', () => {
    const validEmail = 'test@test.com';
    const invalidEmail = 'test.com';
    const mismatchEmail = 'test@tets.com';
    const validName = 'test';
    const shortName = 't';
    const longName = 'thisisclearlywaytoolongandisnotavalidnamebecauseitiswelloverfiftycharacters';

    const formData = { 
        email: validEmail, 
        confirmEmail: validEmail, 
        firstName: validName,
        lastName: validName
    };

    const errorMessageCheck = async (field: string, value: string, message: string) => (
        expect(await yup.reach(SignupFormSchema, field)
            .validate(value)
                .catch((err: yup.ValidationError) => err.message))
                    .toEqual(message)
    );

    const errorMessageConfirmCheck = async (formData: Record<string, any>, field: string, mismatch: string, message: string) => (
        expect(await SignupFormSchema.validate({ ...formData, [field]: mismatch }).catch(err => err.message)).toEqual(message)
    );

    describe('Valid input data', () => {
        it('Should pass validation', () => expect( SignupFormSchema.isValidSync(formData)).toBeTruthy());
    })

    describe('Email', () => {
        it('Should be required', () => errorMessageCheck('email', '', EMAIL_REQUIRED));
        it('Should a valid email address', () => errorMessageCheck('email', invalidEmail, INVALID_EMAIL));
    })

    describe('Confirm Email', () => {
        it('Should be required', () => errorMessageConfirmCheck({ ...formData, email: '' }, 'confirmEmail', '', EMAIL_REQUIRED));
        it('Should match email', () => errorMessageConfirmCheck(formData, 'confirmEmail', mismatchEmail, EMAIL_MATCH));
    })

    describe('First Name', () => {
        it('Should be required', () => errorMessageCheck('firstName', '', FIRST_NAME_REQUIRED));
        it('Should be at least 2 characters', () => errorMessageCheck('firstName', shortName, NAME_LENGTH));
        it('Should be at most 50 characters', () => errorMessageCheck('firstName', longName, NAME_LENGTH));
    })

    describe('Last Name', () => {
        it('Should be required', () => errorMessageCheck('lastName', '', LAST_NAME_REQUIRED));
        it('Should be at least 2 characters', () => errorMessageCheck('lastName', shortName, NAME_LENGTH));
        it('Should be at most 50 characters', () => errorMessageCheck('lastName', longName, NAME_LENGTH));
    })
})