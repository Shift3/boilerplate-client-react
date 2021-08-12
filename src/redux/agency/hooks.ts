import { RootState } from 'core/redux';
import { Agency } from 'models/agency.model';
import { agencySelectors } from './slice';

export const selectAgencies = (state: RootState): Agency[] => agencySelectors.selectAll(state);
