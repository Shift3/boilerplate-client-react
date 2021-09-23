import { useLogoutMutation } from 'features/auth/authApi';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';

export const Logout: FC = () => {
  const [logout] = useLogoutMutation();

  return (
    <>
      <Button variant='link' onClick={() => logout()}>
        Sign Out
      </Button>
    </>
  );
};
