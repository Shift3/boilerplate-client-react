import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFlashMessage, IFlashMessageState } from './types';

const initialState: IFlashMessageState = {
  message: {
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
      state.message = action.payload;
    },

    clearMessage: (state: IFlashMessageState) => {
      // eslint-disable-next-line no-param-reassign
      state.message = null;
    },
  },
});

// export const setMessage = createAsyncThunk('fetchMessage/setMessage', async (message: IFlashMessage, thunkAPI) => {
//   setTimeout(() => {
//     thunkAPI.dispatch(flashMessageSlice.actions.clearMessage());
//   }, message.timeout);
//   return message;
// });

export const { setMessage, clearMessage } = flashMessageSlice.actions;

export default flashMessageSlice.reducer;
