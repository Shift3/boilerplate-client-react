import { FC, ReactNode } from 'react';

export interface HolyGrailLayoutProps {
  header?: ReactNode;
  leftNav?: ReactNode;
  children?: ReactNode;
  rightSide?: ReactNode;
}

export type HolyGrailType = FC<HolyGrailLayoutProps>;
