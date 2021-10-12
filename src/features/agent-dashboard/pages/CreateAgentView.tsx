import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { useCreateAgentMutation } from '../agentApi';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';
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

export const CreateAgentView: FC = () => {
  const history = useHistory();
  const [createAgent] = useCreateAgentMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createAgent({ ...data, thumbnail: 'https://shift3tech.com/images/s3-logo-white.svg' }).unwrap();
      showSuccessNotification('Agent created.');
      history.push('/agents');
    } catch (error) {
      showErrorNotification('Unable to add agent.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>Create Agent </StyledFormTitle>
        <AgentDetailForm submitButtonLabel='CREATE' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </Container>
  );
};
