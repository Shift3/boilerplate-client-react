export interface LoginFormData {
  email: string;
  password: string;
}
export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onCancel: (data: LoginFormData) => void;
}
