export type UserDataType = {
  firstName: string;
  lastName: string;
  profile_picture: string | null | undefined;
  id: string;
};

export type NavbarVariantPropTypes = {
  userData?: UserDataType,
  signOut: Function
};

export type NavbarPropTypes = { navPosition: "top" | "side" };

export type NavbarVariantType = (props: NavbarVariantPropTypes) => JSX.Element;

export type NavbarType = (props: NavbarPropTypes) => JSX.Element;
