import { FC } from 'react';
import Form, { FormProps } from 'react-bootstrap/Form';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const BootstrapForm: FC<FormProps> = ({ children, ...rest }) => <Form {...rest}>{children}</Form>;
