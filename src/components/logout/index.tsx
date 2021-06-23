import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import { useLogoutAction } from 'core/modules/auth/application/logoutUser';

export const Logout: FC = () => {
  const { logoutUser } = useLogoutAction();

  return (
    <>
      <Button variant='link' onClick={logoutUser}>
        Sign Out
      </Button>
    </>
  );
};
