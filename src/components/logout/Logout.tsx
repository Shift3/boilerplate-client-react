import { FC, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Context as AuthContext } from "../../context/auth.context";

export const Logout: FC = () => {
    const { logoutUser } = useContext(AuthContext);

    return (<><Button variant="link" onClick={logoutUser}>Link</Button></>)
};
