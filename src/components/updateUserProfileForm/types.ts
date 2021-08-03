export type UpdateUserProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
}

export type UpdateUserProfileFormProps = {
  onSubmit: (data: UpdateUserProfileFormData) => void;
  onCancel: () => void;
}