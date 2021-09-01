import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';
import { UpdateAgencyForm } from '../components/';

export interface RouteParams {
  id: string;
}

export const UpdateAgencyView: FC = () => {
  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>Update Agency</StyledFormTitle>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
        <UpdateAgencyForm onSubmit={() => {}} onCancel={() => {}} />
      </StyledFormWrapper>
    </Container>
  );
};
