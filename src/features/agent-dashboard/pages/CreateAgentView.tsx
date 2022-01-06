import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';
import { useCreateAgentMutation } from 'common/api/agentApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { Breadcrumb } from 'react-bootstrap';

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
      <Title>Create Agent</Title>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}} >
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/agents'}} >
          Agent List
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Create Agent
        </Breadcrumb.Item>
      </Breadcrumb>
      <StyledFormWrapper>
        <AgentDetailForm submitButtonLabel='CREATE' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
