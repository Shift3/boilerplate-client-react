import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const ReactRouterDomLink: FC<LinkProps> = ({ children, ...rest }) => <Link {...rest}>{children}</Link>;

const Wrapper = styled.div`
  margin-top: 50px;
`;

const StyledLink = styled(ReactRouterDomLink)`
  padding-top: 18px;
  font-size: 1.2em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ForgotPasswordLink: FC = () => (
  <Wrapper>
    <StyledLink to='/auth/forgot-password'>Forgot Password?</StyledLink>
  </Wrapper>
);
