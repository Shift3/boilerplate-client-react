import { FC } from "react";

export type DropdownItemProps = {
  linkText: string;
  testid: string;
}

export type DropDownItemType = FC<DropdownItemProps>;

export type UserDataType = {
  firstName: string;
  lastName: string;
  profile_picture: string | null | undefined;
};

export type TopNavPropTypes = {
  userData?: UserDataType,
  signOut: Function
};

export type TopNavType = (props: TopNavPropTypes) => JSX.Element;