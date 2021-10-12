import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { useCreateAgencyMutation } from '../agencyApi';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';
import styled from 'styled-components';

const StyledFormWrapper = styled.div`
  max-width: 500px;
  min-width: 500px;
  padding: 50px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  & label {
    color: white;
  }
  & .invalid-feedback {
    /* Modify style of validation error messages here */
  }
`;

const StyledFormTitle = styled.p`
  color: ${(props) => props.theme.cardHeader};
  font-size: 2em;
  font-weight: 500;
`;

export const CreateAgencyView: FC = () => {
  const history = useHistory();
  const [createAgency] = useCreateAgencyMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createAgency(data).unwrap();
      showSuccessNotification('Agency created.');
      history.push('/agencies');
    } catch (error) {
      showErrorNotification('Unable to add agency.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>Create Agency</StyledFormTitle>
        <AgencyDetailForm submitButtonLabel='CREATE' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </Container>
  );
};
