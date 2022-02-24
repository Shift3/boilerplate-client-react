import * as Faker from 'faker';
import { Factory } from 'fishery';
import { User } from '../user';
import { ImageFactory } from './image-factory';
import { RoleFactory } from './role-factory';

type UserTransientParams = {
  hasNewEmail?: boolean;
  hasProfilePicture: boolean;
}

export const UserFactory = Factory.define<User, UserTransientParams>(({ params, transientParams, sequence, associations }) => {
  const { hasNewEmail, hasProfilePicture } = transientParams;

  return {
    id: sequence,
    email: Faker.internet.email(),
    activatedAt: Faker.date.recent().toISOString(),
    firstName: params.firstName ?? Faker.name.firstName(),
    lastName: params.lastName ?? Faker.name.lastName(),
    profilePicture: hasProfilePicture ? (associations.profilePicture ?? ImageFactory.build()) : null,
    role: associations.role ?? RoleFactory.build(),
    newEmail: hasNewEmail ? Faker.internet.email() : null,
  }
});
