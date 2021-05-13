import { FC, ReactNode } from 'react';
import { UserService } from '../../services/api/user.service';
import { Context as ServiceContext } from './context';

interface IProps {
  children: ReactNode;
}

export const Provider: FC<IProps> = ({ children }) => {
  const services = {
    userService: new UserService(),
  };

  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
};
