import { FC, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { ThemeContext } from '../../../app/App';

const ToggleButton = styled(Button)`
  justify-content: center;
  align-items: center;
  background-color: gray;
  border: 1px solid black;
  margin: 1em;
  width: 8em;
`;

export const ToggleTheme: FC = () => {
  const { toggle } = useContext(ThemeContext);

  return (
    <div>
      <ToggleButton onClick={() => toggle()}>Change Theme</ToggleButton>
    </div>
  );
};