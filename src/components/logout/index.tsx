import { FC, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Context as AuthContext } from '../../context/auth.context';

export const Logout: FC = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <>
      <Button data-testid="lo-btn" variant="link" onClick={logoutUser}>
        Sign Out
      </Button>
    </>
  );
};
