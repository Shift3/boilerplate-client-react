export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export type ResetPasswordFormProps = {
  onSubmit: (data: ResetPasswordFormData) => void;
  onCancel: () => void;
};
