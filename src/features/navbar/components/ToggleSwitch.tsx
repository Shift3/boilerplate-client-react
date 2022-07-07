import { FC, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { ThemeContext } from '../../../app/App';
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';

const Switch = styled(Button)`
  justify-content: center;
  align-items: center;
  background-color: gray;
  border: 1px solid black;
  margin: 1em;
  width: 8em;
`;

export const ToggleSwitch: FC = () => {
  const { toggle } = useContext(ThemeContext);
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Switch
        type='checkbox'
        id='checkbox-toggle'
        color='blue'
        checked={checked}
        onChange={setChecked}
        onClick={() => toggle()}
      >
        <SunIcon />
        <MoonIcon />
      </Switch>
    </div>
  );
};
