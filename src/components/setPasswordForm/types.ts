export interface ISetPasswordFormData {
    password: string,
    confirmPassword: string,
}

type ISetPasswordFormProps = {
    onSubmit: (data: ISetPasswordFormData) => void
};

export type SetPasswordFormType = (onSubmit: ISetPasswordFormProps) => JSX.Element;