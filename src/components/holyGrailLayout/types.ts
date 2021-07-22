import { ReactNode } from 'react';

export interface HolyGrailLayoutProps {
  header?: ReactNode;
  leftAside?: ReactNode;
  children?: ReactNode;
  rightAside?: ReactNode;
  footer?: ReactNode;
}
