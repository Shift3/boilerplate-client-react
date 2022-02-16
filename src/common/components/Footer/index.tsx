import { FC } from 'react';
import styled from 'styled-components';
import { Constants } from 'utils/constants';

const Wrapper = styled.footer`
  padding-top: 5px;
  text-align: center;
  color: #999;
  bottom: 0;
  padding-left: 280px;
  max-width: 100vw;
  height: ${(props) => props.theme.footer.height};
`;

const { version, creationYear } = Constants;
const currentYear = new Date().getFullYear();

export const copyrightDate: string =
  currentYear > creationYear ? `${creationYear} - ${currentYear}` : (`${creationYear}` as string);

export const Footer: FC = () => (
  <Wrapper data-testid='footer'>
    <span>
      {copyrightDate} &copy; Bitwise Technology Consulting - {version} Staging
    </span>
  </Wrapper>
);
