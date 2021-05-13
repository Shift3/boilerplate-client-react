import { createContext, useContext } from 'react';
import { IUserService, UserService } from '../../services/api/user.service';

interface IServiceContext {
  userService: IUserService;
}

export const Context = createContext<IServiceContext>({ userService: new UserService() });
Context.displayName = 'ServiceContext';

export const useService = (): IServiceContext => useContext(Context);
