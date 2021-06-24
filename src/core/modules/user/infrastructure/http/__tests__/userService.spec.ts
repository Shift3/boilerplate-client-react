import axios, { AxiosInstance } from 'axios';
import { ApiService } from 'core/shared/infrastructure/http/apiService';
import { UserService } from '../userService';

describe('UserService', () => {
  let axiosInstance: AxiosInstance;
  let apiService: ApiService;
  let userService: UserService;

  beforeAll(() => {
    axiosInstance = axios.create();
    apiService = new ApiService(axiosInstance);
    userService = new UserService(apiService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
