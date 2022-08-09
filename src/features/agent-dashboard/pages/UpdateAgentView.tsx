import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAgentByIdQuery, useUpdateAgentMutation } from 'common/api/agentApi';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { isObject } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { Card } from 'react-bootstrap';
import { PageCrumb, PageHeader, SmallContainer } from 'common/styles/page';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';

export type RouteParams = {
  id: string;
};

export const UpdateAgentView: FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [updateAgent] = useUpdateAgentMutation();
  const { data: agent, isLoading: isLoadingAgent, isFetching, error } = useGetAgentByIdQuery(id!);
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  useEffect(() => {
    if (error) {
      notificationService.showErrorMessage('Unable to load agent. Returning to agent list.');
      navigate('/agents', { replace: true });
    }
  }, [error, navigate]);

  const handleFormCancel = () => {
    navigate(-1);
  };

  const handleFormSubmit = async (data: FormData) => {
    const updateRequest = { id: Number(id), ...data };
    try {
      await updateAgent(updateRequest).unwrap();
      notificationService.showSuccessMessage('Agent updated.');
      navigate('/agents');
    } catch (error) {
      notificationService.showErrorMessage('Unable to update agent.');
      if (error && isFetchBaseQueryError(error)) {
        if (isObject(error.data)) {
          setFormValidationErrors(error.data);
        }
      } else {
        throw error;
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
          <h1>Edit Agent</h1>
          <p className='text-muted'>Update this agents details here.</p>
        </div>
      </PageHeader>

      <Card>
        <Card.Body>
          <WithLoadingOverlay
            isInitialLoad={isLoadingAgent && isFetching}
            isLoading={isLoadingAgent}
            containerHasRoundedCorners
            containerBorderRadius='6px'
          >
            {!isLoadingAgent ? (
              <AgentDetailForm
                defaultValues={agent}
                submitButtonLabel='Save'
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                serverValidationErrors={formValidationErrors}
              />
            ) : null}
          </WithLoadingOverlay>
        </Card.Body>
      </Card>
    </SmallContainer>
  );
};
