import { FC } from 'react';
import Form, { FormProps } from 'react-bootstrap/Form';
import styled from 'styled-components';

const BootstrapForm: FC<FormProps> = ({ children, ...rest }) => <Form {...rest}>{children}</Form>;

export const Title = styled.p`

`;

export const StyledForm = styled(BootstrapForm)`

`;

export const StyledFormWrapper = styled.div`

`;
