import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import { useLogout } from 'core/modules/auth/application/useLogout';

export const Logout: FC = () => {
  const { logoutUser } = useLogout();

  return (
    <>
      <Button variant='link' onClick={() => logoutUser()}>
        Sign Out
      </Button>
    </>
  );
};
