import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFlashMessage, IFlashMessageState } from './types';

const initialState: IFlashMessageState = {
  flashMessage: {
    message: 'hello world',
    variant: 'primary',
  },
};

const flashMessageSlice = createSlice({
  name: 'flashMessage',
  initialState,
  reducers: {
    setMessage: (state: IFlashMessageState, action: PayloadAction<IFlashMessage>) => {
      // eslint-disable-next-line no-param-reassign
      state.flashMessage = action.payload;
    },

    clearMessage: (state: IFlashMessageState) => {
      // eslint-disable-next-line no-param-reassign
      state.flashMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      // eslint-disable-next-line no-use-before-define
      setMessageWithTimeout.fulfilled,
      (state: IFlashMessageState, action: PayloadAction<IFlashMessage>) => {
        // eslint-disable-next-line no-param-reassign
        state.flashMessage = action.payload;
      },
    );
  },
});

export const setMessageWithTimeout = createAsyncThunk(
  'fetchMessage/setMessage',
  (payload: { flashMessage: IFlashMessage; timeout: number }, thunkAPI) => {
    setTimeout(() => {
      // eslint-disable-next-line no-use-before-define
      thunkAPI.dispatch(flashMessageSlice.actions.clearMessage());
    }, payload.timeout);
    return payload.flashMessage;
  },
);

export const { setMessage, clearMessage } = flashMessageSlice.actions;

export default flashMessageSlice.reducer;
