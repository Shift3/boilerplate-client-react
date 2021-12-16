import * as Faker from 'faker';
import { Factory } from 'fishery';
import { Agency } from '../agency';

export const AgencyFactory = Factory.define<Agency>(({ sequence }) => ({
  id: sequence,
  createdAt: new Date(),
  agencyName: Faker.company.companyName(),
  userCount: 0,
}));
