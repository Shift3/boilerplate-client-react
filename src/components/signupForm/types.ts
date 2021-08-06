export interface SignUpFormData {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
}
export interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => void;
  onCancel: () => void;
}
