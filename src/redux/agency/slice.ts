import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'core/redux';
import { Agency } from 'models/agency.model';
import { fetchAll } from './thunks';

const entityAdapter = createEntityAdapter<Agency>({});

const agencySlice = createSlice({
  name: 'agencies',
  initialState: entityAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action: PayloadAction<Agency[]>) => {
      const agencies = action.payload;
      entityAdapter.setAll(state, agencies);
    });
  },
});

export const agencySelectors = entityAdapter.getSelectors<RootState>((state) => state.agencies);

export default agencySlice;
