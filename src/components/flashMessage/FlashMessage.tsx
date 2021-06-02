// React imports
import { FC } from 'react';

// Third party imports
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

// App imports
import { selectFlashMessage } from 'redux/flashMessage/selectors';
import { clearMessage } from 'redux/flashMessage/slice';

export const FlashMessage: FC = () => {
  const flashMessage = useSelector(selectFlashMessage);
  const dispatch = useDispatch();

  return (
    <>
      {flashMessage && (
        <Alert variant={flashMessage.variant} dismissible onClose={() => dispatch(clearMessage())}>
          {flashMessage.message}
        </Alert>
      )}
    </>
  );
};
