export type UpdateUserFormData = {
  firstName: string;
  lastName: string;
  email: string;
}

export type UpdateUserFormProps = {
  onSubmit: (data: UpdateUserFormData) => void;
  onCancel: () => void;
}