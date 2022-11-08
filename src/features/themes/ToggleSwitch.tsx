import { FC } from 'react';
import styled from 'styled-components';
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import { useTheme } from './useTheme';

const Switch = styled.div`
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius};
  padding: 8px;

  &:hover {
    background: ${props => props.theme.buttons.defaultBackgroundColor};
  }
`;

export const ThemeToggle: FC = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <div>
      <Switch onClick={() => toggleTheme()}>{theme === 'light' ? <MoonIcon /> : <SunIcon />}</Switch>
    </div>
  );
};
