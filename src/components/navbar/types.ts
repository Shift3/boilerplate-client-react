export type NavbarPropsType = {
  navType: "topNav" | "sideNav"
};

export type NavbarType = (props: NavbarPropsType) => JSX.Element;