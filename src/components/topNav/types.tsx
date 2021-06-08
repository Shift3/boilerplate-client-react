import { FC } from "react"

export type DropdownItemProps = {
    linkText: string;
    pathname: string;
    testid: string;
}

export type DropDownItemType = FC<DropdownItemProps>;