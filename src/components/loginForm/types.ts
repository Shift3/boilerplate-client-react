import { FC } from "react";

export interface ILoginFormProps {
    onSubmit: (data: ILoginFormData) => void
}

export interface ILoginFormData {
    email: string,
    password: string
}

export type LoginFormType = FC<ILoginFormProps>