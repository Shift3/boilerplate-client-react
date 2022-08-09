import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateAgentMutation } from 'common/api/agentApi';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { isObject } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { Card } from 'react-bootstrap';
import { PageCrumb, PageHeader, SmallContainer } from 'common/styles/page';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';

export const CreateAgentView: FC = () => {
  const navigate = useNavigate();
  const [createAgent] = useCreateAgentMutation();
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const handleFormCancel = () => {
    navigate(-1);
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createAgent({ ...data, thumbnail: 'https://shift3tech.com/images/s3-logo-white.svg' }).unwrap();
      notificationService.showSuccessMessage('Agent created.');
      navigate('/agents');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add agent.');
      if (error && isFetchBaseQueryError(error)) {
        if (isObject(error.data)) {
          setFormValidationErrors(error.data);
        } else {
          throw error;
        }
      }
    }
  };

  return (
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

      <Card>
        <Card.Body>
          <AgentDetailForm
            submitButtonLabel='Create'
            onCancel={handleFormCancel}
            onSubmit={handleFormSubmit}
            serverValidationErrors={formValidationErrors}
          />
        </Card.Body>
      </Card>
    </SmallContainer>
  );
};
