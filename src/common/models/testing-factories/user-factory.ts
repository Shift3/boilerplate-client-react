import { faker as Faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { Role } from '..';
import { User } from '../user';
import { ImageFactory } from './image-factory';

type UserTransientParams = {
  hasNewEmail?: boolean;
  hasProfilePicture: boolean;
};

export const UserFactory = Factory.define<User, UserTransientParams>(
  ({ params, transientParams, sequence, associations }) => {
    const { hasNewEmail, hasProfilePicture } = transientParams;

    return {
      id: sequence.toString(),
      email: Faker.internet.email(),
      activatedAt: Faker.date.recent().toISOString(),
      firstName: params.firstName ?? Faker.name.firstName(),
      lastName: params.lastName ?? Faker.name.lastName(),
      profilePicture: hasProfilePicture ? associations.profilePicture ?? ImageFactory.build() : null,
      role: Role.ADMIN,
      newEmail: hasNewEmail ? Faker.internet.email() : null,
    };
  },
);
