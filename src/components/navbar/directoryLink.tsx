import { FC } from 'react';
import { DirectoryLink, NavIcon } from './styled/topNav.styled';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

export const NavDirectoryLink: FC = () => (
  <DirectoryLink data-testid='directoryLink' to='/content/agent-list'>
    <NavIcon icon={ faStethoscope } />
    <span data-testid='directoryLinkText'>Directory</span>
  </DirectoryLink>
);