export interface HolyGrailLayoutProps {
  leftSidebar: JSX.Element;
  children?: JSX.Element[];
  rightSidebar?: JSX.Element;
  footer?: JSX.Element;
}

export type HolyGrail = ({ leftSidebar, children, rightSidebar, footer }: HolyGrailLayoutProps) => JSX.Element;
