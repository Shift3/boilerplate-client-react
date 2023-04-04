import { ThemeContext } from '../../app/App';
import { useContext } from 'react';

export const useTheme = () => {
  return useContext(ThemeContext);
};
