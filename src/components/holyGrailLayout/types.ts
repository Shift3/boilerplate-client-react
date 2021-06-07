import { FC, ReactNode } from 'react';

export interface HolyGrailLayoutProps {
  leftSidebar?: ReactNode;
  children?: ReactNode;
  rightSidebar?: ReactNode;
}

export type HolyGrailType = FC<HolyGrailLayoutProps>;
