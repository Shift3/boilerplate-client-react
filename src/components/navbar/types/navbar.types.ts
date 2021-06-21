export type UserDataType = {
  firstName: string;
  lastName: string;
  profile_picture: string | null | undefined;
};

export type NavbarPropTypes = {
  userData?: UserDataType,
  signOut: Function
};

export type NavbarType = (props: NavbarPropTypes) => JSX.Element;