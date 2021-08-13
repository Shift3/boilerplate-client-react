import { RootState } from 'core/redux';
import { IAgency } from 'models/agency';
import { agencySelectors } from './slice';

export const selectAgencies = (state: RootState): IAgency[] => agencySelectors.selectAll(state);
