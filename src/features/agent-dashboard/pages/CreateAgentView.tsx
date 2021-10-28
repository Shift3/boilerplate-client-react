import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';
import { PageWrapper, Title, StyledFormWrapper } from '../../styles/PageStyles';
import { useCreateAgentMutation } from 'common/api/agentApi';

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
    <PageWrapper>
      <StyledFormWrapper>
        <Title>Create Agent </Title>
        <AgentDetailForm submitButtonLabel='CREATE' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
