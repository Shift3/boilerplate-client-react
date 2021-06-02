export interface IFlashMessage {
  message: string;
  variant: string;
  timeout?: number;
}

export type FlashMessage = IFlashMessage | null;

export interface IFlashMessageState {
  message: FlashMessage;
}
