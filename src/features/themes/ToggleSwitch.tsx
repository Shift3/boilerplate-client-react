import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import { useTheme } from './useTheme';

const Switch = styled(Button)`
  justify-content: center;
  align-items: center;
  background-color: gray;
  border: 1px solid black;
  margin: 1em;
  width: 8em;
`;

export const ToggleSwitch: FC = () => {
  const { toggle, theme } = useTheme();

  return (
    <div>
      <Switch onClick={() => toggle()}>{theme === 'light' ? <MoonIcon /> : <SunIcon />}</Switch>
    </div>
  );
};
