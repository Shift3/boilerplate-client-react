export interface HolyGrailLayoutProps {
  navBar?: JSX.Element
  footer?: JSX.Element
  children?: JSX.Element[]
}

export type HolyGrail = ({ navBar, footer, children }: HolyGrailLayoutProps) => JSX.Element
