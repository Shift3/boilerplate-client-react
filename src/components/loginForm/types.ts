export interface ILoginFormProps {
    onSubmit: (data: ILoginFormData) => void
}

export interface ILoginFormData {
    email: string,
    password: string
}

export type LoginFormType = (props: ILoginFormProps) => JSX.Element;