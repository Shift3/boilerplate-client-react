import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';
import { useGetAgentByIdQuery, useUpdateAgentMutation } from 'common/api/agentApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';

export interface RouteParams {
  id: string;
}

export const UpdateAgentView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const [updateAgent] = useUpdateAgentMutation();
  const { data: agent, isLoading: isLoadingAgent, error } = useGetAgentByIdQuery(id);

  useEffect(() => {
    if (error) {
      notificationService.showErrorMessage('Unable to load agent. Returning to agent list.');
      history.replace('/agents');
    }
  }, [error, history]);

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    const updateRequest = { id: Number(id), ...data };
    try {
      await updateAgent(updateRequest).unwrap();
      notificationService.showSuccessMessage('Agent updated.');
      history.push('/agents');
    } catch (error) {
      notificationService.showErrorMessage('Unable to update agent.');
    }
  };

  return (
    <PageWrapper>
      <WithLoadingOverlay isLoading={isLoadingAgent}>
        <StyledFormWrapper>
          <Title>Update Agent</Title>
          <AgentDetailForm
            defaultValues={agent}
            submitButtonLabel='UPDATE'
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </StyledFormWrapper>
      </WithLoadingOverlay>
    </PageWrapper>
  );
};
