import { FC } from 'react';
import styled from 'styled-components';
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import { useTheme } from './useTheme';

const Switch = styled.div`
  @media (max-width: 767px) {
    position: absolute;
    top: 0;
    right: 48px;
  }

  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius};
  padding: 8px;
  display: inline-block;

  &:hover {
    background: ${props => props.theme.buttons.defaultBackgroundColor};
  }
`;

export const ThemeToggle: FC = () => {
  const { toggle, theme } = useTheme();

  return (
    <div>
      <Switch onClick={() => toggle()}>{theme === 'light' ? <MoonIcon /> : <SunIcon />}</Switch>
    </div>
  );
};
