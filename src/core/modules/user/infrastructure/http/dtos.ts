export type SignUpRequest = {
  email: string;
  firstName: string;
  lastName: string;
};

export type ActivateAccountRequest = {
  newPassword: string;
  confirmPassword: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type ResetPasswordRequest = {
  newPassword: string;
  confirmPassword: string;
};

export type UserResponse = {
  id: number;
  email: string;
  activatedAt: string | null;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  agency: any;
  role: any;
};
