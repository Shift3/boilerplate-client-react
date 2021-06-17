import { FC, useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import { FlashMessageContainer } from './styled';
import { Context as FlashMessageContext } from '../../context/flashMessage.context';

export const FlashMessage: FC = () => {
  const { flashMessage } = useContext(FlashMessageContext);

  return (
    <FlashMessageContainer data-testid='flashMessageContainer'>
      {flashMessage && <Alert variant={flashMessage.variant}>{flashMessage.message}</Alert>}
    </FlashMessageContainer>
  );
};
