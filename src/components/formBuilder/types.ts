import { SetStateAction } from "react";
import { SchemaOf } from 'yup';

export interface IRegisterFormData {
  email: string,
  confirmEmail: string,
  firstName: string,
  lastName: string
}

export interface ILoginFormData {
  username: string,
  password: string
}

export interface ISetPasswordFormData {
  password: string,
  confirmPassword: string
}

export interface IInputConfig {
    name: string
    inputType: "input",
    type: string,
    label: string | undefined,
    text: string,
    placeholder: string | undefined,
    initialValue: null
    required: boolean
    autocomplete: AutocompleteType
}

export interface IInputData {
    touched: boolean
    value: any,
    error: string,
    required: boolean
  }

export interface IFormProps {
    schemaGenerator: SchemaGenerator,
    config: IInputConfig[],
    onSubmit: (formData: Record<string, unknown>) => void
    title: string
}

export type SetFormState = SetStateAction<{ values: Record<string, any>; touched: boolean; errors: never[]; }>

export type GenerateSetPasswordFormSchema = (stateRef: Record<string, any>) => SchemaOf<ISetPasswordFormData>;
export type GenerateLoginFormSchema = () => SchemaOf<ILoginFormData>
export type GenerateRegisterFormSchema = (stateRef: Record<string, any>) => SchemaOf<IRegisterFormData>;

export type SchemaGenerator = GenerateLoginFormSchema | GenerateSetPasswordFormSchema | GenerateRegisterFormSchema;

export type FormData = ILoginFormData | IRegisterFormData | ISetPasswordFormData;

export type AutocompleteType =
  | 'off'
  | 'on'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo';