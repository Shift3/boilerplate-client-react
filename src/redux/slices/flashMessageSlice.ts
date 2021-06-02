import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFlashMessage {
  message: string;
  variant: string;
  timeout: number;
}

interface IFlashMessageState {
  message: IFlashMessage | null;
}

const initialState: IFlashMessageState = {
  message: null,
};

const flashMessageSlice = createSlice({
  name: 'flashMessage',
  initialState,
  reducers: {
    setFlashMessage: (state: IFlashMessageState, action: PayloadAction<IFlashMessage>) => {
      state.message = action.payload;
    },
  },
});

export default flashMessageSlice.reducer;
