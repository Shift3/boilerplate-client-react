import { FC } from 'react';
import styled from 'styled-components';
import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';
import { useTheme } from './useTheme';

const Switch = styled.div`
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius};
  padding: 8px;

  &:hover {
    background: ${props => props.theme.buttons.defaultBackgroundColor};
  }
`;

export const ToggleSwitch: FC = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <Switch
      onClick={() => toggleTheme()}
      aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
      tabIndex={0}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Switch>
  );
};
