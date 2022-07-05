import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const ToggleButton = styled(Button)`
  justify-content: center;
  align-items: center;
  background-color: gray;
  border: 1px solid black;
  margin: 1em;
  width: 8em;
`;

export const ChangeThemeButton: FC = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    return theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <div>
      <ToggleButton onClick={() => toggleTheme()}>Change Theme</ToggleButton>
    </div>
  );
};
