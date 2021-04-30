export interface ISetPasswordFormProps {
    onFormSubmit: (data: ISetPasswordFormData) => void
}

export interface ISetPasswordFormData {
    password: string,
    confirmPassword: string,
}