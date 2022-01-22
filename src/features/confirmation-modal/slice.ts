import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'app/redux';

export interface ConfirmationModalState {
  show: boolean;
  loading: boolean;
  message: string;
  declineButtonLabel: string;
  confirmButtonLabel: string;
}

export type ConfirmationModalCallback = () => Promise<void>;

interface ConfirmationModalCallbacks {
  onConfirm?: ConfirmationModalCallback;
  onDecline?: ConfirmationModalCallback;
}

const callbacks: ConfirmationModalCallbacks = {
  onConfirm: undefined,
  onDecline: undefined,
};

const initialState: ConfirmationModalState = {
  show: false,
  loading: false,
  message: '',
  declineButtonLabel: 'CANCEL',
  confirmButtonLabel: 'CONFIRM',
};

type ModalOpenedPayload = Partial<
  Pick<ConfirmationModalState, 'message' | 'confirmButtonLabel' | 'declineButtonLabel'>
>;

export const confirmationModalSlice = createSlice({
  name: 'confirmationModal',
  initialState,
  reducers: {
    modalOpened: (state: ConfirmationModalState, action: PayloadAction<ModalOpenedPayload>) => {
      const { message, confirmButtonLabel, declineButtonLabel } = action.payload;

      state.show = true;
      state.loading = false;
      state.message = message || initialState.message;
      state.declineButtonLabel = declineButtonLabel || initialState.declineButtonLabel;
      state.confirmButtonLabel = confirmButtonLabel || initialState.confirmButtonLabel;
    },

    modalLoading: (state: ConfirmationModalState) => {
      state.loading = true;
    },

    modalClosed: (state: ConfirmationModalState) => {
      state.show = initialState.show;
      state.loading = initialState.loading;
      state.message = initialState.message;
      state.declineButtonLabel = initialState.declineButtonLabel;
      state.confirmButtonLabel = initialState.confirmButtonLabel;
    },
  },
});

interface OpenModalArgs {
  message: string;
  confirmButtonLabel: string;
  declineButtonLabel: string;
  onConfirm: ConfirmationModalCallback;
  onDecline: ConfirmationModalCallback;
}

export const openConfirmationModal = createAsyncThunk<void, Partial<OpenModalArgs>, { dispatch: AppDispatch }>(
  'confirmationModal/open',
  async (args, thunkApi) => {
    const { onConfirm, onDecline, ...modalOpenedPayload } = args;
    const { dispatch } = thunkApi;

    callbacks.onConfirm = onConfirm;
    callbacks.onDecline = onDecline;

    dispatch(confirmationModalSlice.actions.modalOpened(modalOpenedPayload));
  },
);

export const confirmConfirmationModal = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'confirmationModal/confirm',
  async (_, thunkApi) => {
    const { onConfirm } = callbacks;
    const { dispatch } = thunkApi;

    dispatch(confirmationModalSlice.actions.modalLoading());

    if (onConfirm) {
      await onConfirm();
    }

    dispatch(confirmationModalSlice.actions.modalClosed());
  },
);

export const declineConfirmationModal = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'confirmationModal/decline',
  async (_, thunkApi) => {
    const { onDecline } = callbacks;
    const { dispatch } = thunkApi;

    if (onDecline) {
      await onDecline();
    }

    dispatch(confirmationModalSlice.actions.modalClosed());
  },
);

export const selectConfirmationModalState = (state: RootState): ConfirmationModalState => state.confirmationModal;
