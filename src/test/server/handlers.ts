import { User } from 'common/models';
import { UserFactory } from 'common/models/testing-factories';
import { environment } from 'environment';
import { StatusCodes } from 'http-status-codes';
import { rest } from 'msw';

export const baseUrl = environment.apiRoute;

export const handlers = [
  rest.post(`${baseUrl}/users`, (req, res, ctx) => {
    const newUser = UserFactory.build({ ...(req.body as Partial<User>) });
    return res(ctx.status(StatusCodes.CREATED), ctx.json(newUser));
  }),
];
