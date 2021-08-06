export type CreateUserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  agency: string;
};

export type CreateUserFormProps = {
  onSubmit: (data: CreateUserFormData) => void;
  onCancel: () => void;
};
