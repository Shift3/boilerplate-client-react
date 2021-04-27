import { IMessage } from '../../models/message'
import { IForgotPasswordRequest, IResetPasswordRequest, IUserDTO } from '../../models/users'
import { ApiService } from './api.service'

export interface IUserService {
  forgotPassword: (payload: IForgotPasswordRequest) => Promise<IMessage>
  resetPassword: (payload: IResetPasswordRequest, token: string) => Promise<IUserDTO>
}

export class UserService implements IUserService {
  private readonly apiService

  private readonly controllerRoute = '/users'

  constructor(apiService?: ApiService) {
    this.apiService = apiService ?? new ApiService()
  }

  public async forgotPassword(payload: IForgotPasswordRequest): Promise<IMessage> {
    const endpoint = `${this.controllerRoute}/forgot-password`
    return this.apiService.post<IMessage, IForgotPasswordRequest>(endpoint, payload)
  }

  public async resetPassword(payload: IResetPasswordRequest, token: string): Promise<IUserDTO> {
    const endpoint = `${this.controllerRoute}/reset-password/${token}`
    return this.apiService.put<IUserDTO, IResetPasswordRequest>(endpoint, payload)
  }
}
