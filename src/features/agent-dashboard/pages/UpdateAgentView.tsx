import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC, useLayoutEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory, useParams } from 'react-router-dom';
import { useGetAgentsQuery, useUpdateAgentMutation } from '../agentApi';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';

export interface RouteParams {
  id: string;
}

export const UpdateAgentView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const [updateAgent] = useUpdateAgentMutation();

  // Since the AgentListView is subscribed to the query and we just want to pick an item from that query,
  // we do not need to perform an additional request here. Instead, we can use the `selectFromResult` option
  // to get a specific item from the cached query result. For more info, see the following RTK Query docs
  // https://redux-toolkit.js.org/rtk-query/usage/queries#selecting-data-from-a-query-result.
  const { agent } = useGetAgentsQuery(undefined, {
    selectFromResult: ({ data: agents }) => ({
      agent: agents?.find((agent) => agent.id === Number(id)),
    }),
  });

  // Since a user can manually type in any random id into the url, we need to ensure `id` is a string that represents
  // a valid number, and that `id` is a valid agent id for one of the agencies from the query result in the list view.
  // useLayoutEffect` is used instead of `useEffect` so that the check and redirect occur before the component gets
  // rendered for the first time to the screen.
  useLayoutEffect(() => {
    if (Number.isNaN(Number(id)) || !agent) {
      showErrorNotification('Unable to load agent. Returning to agent list.');
      history.replace('/agents');
    }
  }, [id, history, agent, showErrorNotification]);

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
      <StyledFormWrapper>
        <StyledFormTitle>Update Agent</StyledFormTitle>
        <AgentDetailForm
          defaultValues={agent}
          submitButtonLabel='UPDATE'
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </StyledFormWrapper>
    </Container>
  );
};
