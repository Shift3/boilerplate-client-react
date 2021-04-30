export interface ILoginFormProps {
    onFormSubmit: (data: ILoginFormData) => void
}

export interface ILoginFormData {
    email: string,
    password: string
}

export type LoginFormType = () => JSX.Element;