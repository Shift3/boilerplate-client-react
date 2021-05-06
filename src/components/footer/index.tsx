import { FC } from 'react';
import { Wrapper } from './Wrapper';
import { Constants } from '../../utils/constants';

const copyrightDate = () => {
  const creationYear = 2021;
  const currentYear = new Date().getFullYear();

  return currentYear > creationYear ? `${creationYear} - ${currentYear}` : `${creationYear}`;
};

export const Footer: FC = () => (
  <Wrapper>
    <span>&copy; Bitwise Technology Constulting - {Constants.version} Staging </span>
    {copyrightDate()}
  </Wrapper>
);
