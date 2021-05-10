import { FC } from 'react';
import { Wrapper } from './styled';
import { Constants } from '../../utils/constants';

export const creationYear = 2021;

export const copyrightDate: any = () => {
  const currentYear = new Date().getFullYear();

  return currentYear > creationYear ? `${creationYear} - ${currentYear}` : (`${creationYear}` as string);
};

export const Footer: FC = () => (
  <Wrapper>
    <span>&copy; Bitwise Technology Constulting - {Constants.version} Staging&nbsp;</span>
    {copyrightDate()}
  </Wrapper>
);
