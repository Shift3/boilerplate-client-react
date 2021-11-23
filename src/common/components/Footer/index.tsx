import { FC } from 'react';
import styled from 'styled-components';
import { Constants } from 'utils/constants';

const Wrapper = styled.footer`
  padding-top: 5px;
  text-align: center;
  background-color: ${(props) => props.theme.footer.backgroundColor};
  color: ${(props) => props.theme.footer.textColor};
  bottom: 0;
  width: 100vw;
  height: ${(props) => props.theme.footer.height};
`;

const { version, creationYear } = Constants;
const currentYear = new Date().getFullYear();

export const copyrightDate: string =
  currentYear > creationYear ? `${creationYear} - ${currentYear}` : (`${creationYear}` as string);

export const Footer: FC = () => (
  <Wrapper data-testid='footer'>
    <span>
      &copy; Bitwise Technology Consulting - {version} Staging &nbsp; {copyrightDate}
    </span>
  </Wrapper>
);
