import { FC } from 'react';

export type NavDropdownPropsType = {
  firstName: string;
  lastName: string;
  profile_picture: string | undefined | null;
}

export type NavDropdownType = (props: NavDropdownPropsType) => JSX.Element;

export type DropdownItemProps = {
  linkText: string;
  testid: string;
}

export type DropDownItemType = FC<DropdownItemProps>;