import { FC } from 'react';
import { Constants } from 'utils/constants';

const { version, creationYear, footerCopyright, environmentName } = Constants;
const currentYear = new Date().getFullYear();

export const copyrightDate: string =
  currentYear > creationYear ? `${creationYear} - ${currentYear}` : (`${creationYear}` as string);

export const FooterContent: FC = () => (
  <span>
    {copyrightDate} {footerCopyright} - {version} {environmentName}
  </span>
);
