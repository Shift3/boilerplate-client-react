import { FC, useState } from 'react';
import { SideNav } from './sideNav';
import { TopNav } from './topNav';
import { Constants } from 'utils/constants';

const { navPosition } = Constants;

export const Navbar: FC = () => {
  // @TODO - utilize hook within redux to proc state update within nav via userData
  // eslint-disable-next-line
  const [ userData, setUserData ] = useState({
    firstName: "Testy",
    lastName: "Testerson",
    profile_picture: null,
  });

  const signOut = () => {
    // eslint-disable-next-line
    console.log("Sign Out button clicked");
  };

  return navPosition === "top"
    ? <TopNav userData={ userData } signOut={ signOut } />
    : <SideNav userData={ userData } signOut={ signOut } />;
};