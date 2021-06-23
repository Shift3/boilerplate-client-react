import { FC, ReactNode } from 'react';

export interface HolyGrailLayoutProps {
  leftSidebar?: ReactNode;
  children?: ReactNode;
  rightSidebar?: ReactNode;
  navPosition: "top" | "side"
}

export type HolyGrailType = FC<HolyGrailLayoutProps>;
