import { FC } from 'react';
import styled from 'styled-components';
import { Constants } from '../../utils/constants';

const Wrapper = styled.footer`
  text-align: center;
  background-color: #175f6e;
  color: white;
  position: relative;
  bottom: 0;
  width: 100vw;
  height: ${(props) => props.theme.footerHeight};
`;

const { version, creationYear } = Constants;
const currentYear = new Date().getFullYear();

export const copyrightDate: string =
  currentYear > creationYear ? `${creationYear} - ${currentYear}` : `${creationYear}` as string;

export const Footer: FC = () => (
  <Wrapper data-testid='footer'>
    <span data-testid='copyright'>
      &copy; Bitwise Technology Constulting - {version} Staging &nbsp; {copyrightDate}
    </span>
  </Wrapper>
);
