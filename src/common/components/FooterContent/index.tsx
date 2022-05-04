import { FC } from 'react';
import { Constants } from 'utils/constants';

const { version, creationYear } = Constants;
const currentYear = new Date().getFullYear();

export const copyrightDate: string =
  currentYear > creationYear ? `${creationYear} - ${currentYear}` : (`${creationYear}` as string);

export const FooterContent: FC = () => (
  <span>
    {copyrightDate} &copy; Bitwise Technology Consulting - {version} Staging
  </span>
);
