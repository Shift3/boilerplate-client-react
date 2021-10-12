import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory, useParams } from 'react-router-dom';
import { useGetAgentByIdQuery, useUpdateAgentMutation } from '../agentApi';
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
export interface RouteParams {
  id: string;
}

export const UpdateAgentView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const [updateAgent] = useUpdateAgentMutation();
  const { data: agent, isLoading: isLoadingAgent, error } = useGetAgentByIdQuery(id);

  useEffect(() => {
    if (error) {
      showErrorNotification('Unable to load agent. Returning to agent list.');
      history.replace('/agents');
    }
  }, [error, history, showErrorNotification]);

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    const updateRequest = { id: Number(id), ...data };
    try {
      await updateAgent(updateRequest).unwrap();
      showSuccessNotification('Agent updated.');
      history.push('/agents');
    } catch (error) {
      showErrorNotification('Unable to update agent.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      <WithLoadingOverlay isLoading={isLoadingAgent}>
        <StyledFormWrapper>
          <StyledFormTitle>Update Agent</StyledFormTitle>
          <AgentDetailForm
            defaultValues={agent}
            submitButtonLabel='UPDATE'
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </StyledFormWrapper>
      </WithLoadingOverlay>
    </Container>
  );
};
