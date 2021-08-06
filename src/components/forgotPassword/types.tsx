export interface ForgotPassswordFormData {
  email: string;
}

export type ForgotPasswordFormProps = {
  onSubmit: (data: ForgotPassswordFormData) => void;
  onCancel: () => void;
};