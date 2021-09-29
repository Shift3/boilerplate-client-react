import * as Faker from 'faker';
import { Factory } from 'fishery';
import { Agency } from '../agency';

export const agencyFactory = Factory.define<Agency>(({ sequence }) => ({
  id: sequence,
  agencyName: Faker.company.companyName(),
}));
