export interface ISignupFormProps {
    onFormSubmit: (data: ISignupFormData) => void
}

export interface ISignupFormData {
    email: string,
    confirmEmail: string,
    firstName: string,
    lastName: string
}