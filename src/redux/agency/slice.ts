import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'core/redux';
import { IAgency } from 'models/agency';
import { fetchAll } from './thunks';

const agenciesAdapter = createEntityAdapter<IAgency>();

const agencySlice = createSlice({
  name: 'agencies',
  initialState: agenciesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action: PayloadAction<IAgency[]>) => {
      const agencies = action.payload;
      agenciesAdapter.setAll(state, agencies);
    });
  },
});

export const agencySelectors = agenciesAdapter.getSelectors<RootState>((state) => state.agencies);

export default agencySlice;
