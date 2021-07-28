export type CreateUserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export type CreateUserFormProps = {
  onSubmit: (data: CreateUserFormData) => void;
  onCancel: () => void;
}