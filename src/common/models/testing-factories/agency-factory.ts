import * as Faker from 'faker';
import { Factory } from 'fishery';
import { Agency } from '../agency';

export const AgencyFactory = Factory.define<Agency>(({ sequence }) => ({
  id: sequence,
  agencyName: Faker.company.companyName(),
}));
