import axios, { AxiosInstance } from 'axios';
import { ApiService } from './api.service';
import { UserService } from './user.service';

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
