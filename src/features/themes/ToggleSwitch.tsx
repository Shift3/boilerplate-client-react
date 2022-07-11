import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import { useTheme } from './useTheme';

const Switch = styled.div`
  position: absolute;
  top: 28px;
  right: 32px;
  cursor: pointer;
  padding: 16px;
  border-radius: ${props => props.theme.borderRadius};

  &:hover {
    background: ${props => props.theme.buttons.defaultBackgroundColor};
  }
`;

export const ToggleSwitch: FC = () => {
  const { toggle, theme } = useTheme();

  return (
    <div>
      <Switch onClick={() => toggle()}>{theme === 'light' ? <MoonIcon /> : <SunIcon />}</Switch>
    </div>
  );
};
