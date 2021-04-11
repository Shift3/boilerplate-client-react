export interface ILoginFormData {
  username: string
  password: string
}

export interface ILoginFormProps {
  onSubmit: (username: string, password: string) => void
}
