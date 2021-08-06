export type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ChangePasswordFormProps = {
  onSubmit: (data: ChangePasswordFormData) => void;
};