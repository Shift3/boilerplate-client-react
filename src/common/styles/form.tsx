import { FC } from 'react';
import Form, { FormProps } from 'react-bootstrap/Form';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const BootstrapForm: FC<FormProps> = ({ children, ...rest }) => <Form {...rest}>{children}</Form>;

export const Title = styled.p``;

export const StyledForm = styled(BootstrapForm)``;

export const StyledFormWrapper = styled.div``;

export const FormCard = styled(Card)`
  background: white;
  border-radius: 6px;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
