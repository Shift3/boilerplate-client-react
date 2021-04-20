export interface HolyGrailLayoutProps {
  leftSidebar?: JSX.Element
  footer?: JSX.Element
  children?: JSX.Element[]
}

export type HolyGrail = ({ leftSidebar, footer, children }: HolyGrailLayoutProps) => JSX.Element
