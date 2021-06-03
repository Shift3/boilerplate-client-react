export interface IFlashMessage {
  message: string;
  variant: string;
}

export type FlashMessage = IFlashMessage | null;

export interface IFlashMessageState {
  flashMessage: FlashMessage;
}
