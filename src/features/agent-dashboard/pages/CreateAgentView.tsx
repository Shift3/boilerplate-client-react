import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateAgentMutation } from 'common/api/agentApi';
import { FormCard, PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';

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
    <HolyGrailLayout>
      <SmallContainer>
        <PageCrumb>
          <Link to='/agents'>
            <FontAwesomeIcon icon={['fas', 'chevron-left']} /> Back to Agent List
          </Link>
        </PageCrumb>
        <PageHeader>
          <div>
            <h1>Create Agent</h1>
            <p className='text-muted'>Add a new agent to the system.</p>
          </div>
        </PageHeader>

        <FormCard>
          <FormCard.Body>
            <StyledFormWrapper>
              <AgentDetailForm submitButtonLabel='Create' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
            </StyledFormWrapper>
          </FormCard.Body>
        </FormCard>
      </SmallContainer>
    </HolyGrailLayout>
  );
};
