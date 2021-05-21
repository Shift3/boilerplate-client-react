import { FC } from 'react';
import { Wrapper } from './Wrapper';
import { Constants } from '../../utils/constants';

const { version, creationYear } = Constants;
const currentYear = new Date().getFullYear();

export const copyrightDate: string =
  currentYear > creationYear ? `${creationYear} - ${currentYear}` : `${creationYear}` as string;

export const Footer: FC = () => (
  <Wrapper>
    <span data-testid="copyright">
      &copy; Bitwise Technology Constulting - {version} Staging &nbsp; {copyrightDate}
    </span>
  </Wrapper>
);
