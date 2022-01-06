import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';
import { useCreateAgentMutation } from 'common/api/agentApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { BreadcrumbComponent } from 'common/components/Breadcrumb';

export const CreateAgentView: FC = () => {
  const history = useHistory();
  const [createAgent] = useCreateAgentMutation();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createAgent({ ...data, thumbnail: 'https://shift3tech.com/images/s3-logo-white.svg' }).unwrap();
      notificationService.showSuccessMessage('Agent created.');
      history.push('/agents');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add agent.');
    }
  };

  return (
    <PageWrapper>
      <Title>Create Agent View</Title>
      <BreadcrumbComponent path={['Home', 'Agent List', 'Create Agent']} />
      <StyledFormWrapper>
        <Title>Create Agent </Title>
        <AgentDetailForm submitButtonLabel='CREATE' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
