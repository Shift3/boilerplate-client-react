export interface ILoginFormData {
    username: string
    password: string
  }
  export interface ILoginFormProps {
    onSubmit: (formData: ILoginFormData) => void
  }