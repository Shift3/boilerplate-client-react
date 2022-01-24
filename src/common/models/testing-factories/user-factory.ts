import * as Faker from 'faker';
import { Factory } from 'fishery';
import { User } from '../user';
import { AgencyFactory } from './agency-factory';
import { RoleFactory } from './role-factory';

export const UserFactory = Factory.define<User>(({ sequence, associations }) => ({
  id: sequence,
  email: Faker.internet.email(),
  activatedAt: Faker.date.recent().toISOString(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  profilePicture: Faker.internet.avatar(),
  agency: associations.agency ?? AgencyFactory.build(),
  role: associations.role ?? RoleFactory.build(),
  newEmail: Faker.internet.email(),
}));
