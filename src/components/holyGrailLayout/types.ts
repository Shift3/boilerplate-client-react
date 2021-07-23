import { ReactNode } from 'react';

export type HolyGrailLayoutProps = {
  header?: ReactNode;
  leftAside?: ReactNode;
  children?: ReactNode;
  rightAside?: ReactNode;
  footer?: ReactNode;
}