import * as Faker from 'faker';
import { Factory } from 'fishery';
import { agencyFactory, roleFactory } from '.';
import { User } from '../user';

export const userFactory = Factory.define<User>(({ sequence, associations }) => ({
  id: sequence,
  email: Faker.internet.email(),
  activatedAt: Faker.date.recent().toISOString(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  profilePicture: Faker.internet.avatar(),
  agency: associations.agency ?? agencyFactory.build(),
  role: associations.role ?? roleFactory.build(),
}));
