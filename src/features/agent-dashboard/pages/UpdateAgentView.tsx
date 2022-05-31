import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAgentByIdQuery, useGetAgentHistoryQuery, useUpdateAgentMutation } from 'common/api/agentApi';
import { ChangeLog } from 'common/components/ChangeLog';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { isErrorResponse, isFetchBaseQueryError } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { FormCard, StyledFormWrapper } from 'common/styles/form';
import { PageCrumb, PageHeader, SmallContainer } from 'common/styles/page';
import { useAuth } from 'features/auth/hooks';
import { FC, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';
import AppTheme from 'utils/styleValues';

export type RouteParams = {
  id: string;
};

export const UpdateAgentView: FC = () => {
  const { id } = useParams<RouteParams>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [updateAgent] = useUpdateAgentMutation();
  const { data: agent, isLoading: isLoadingAgent, isFetching, error } = useGetAgentByIdQuery(id!);
  const { data: agentHistory, error: agentHistoryError } = useGetAgentHistoryQuery(
    { id, page: 1, pageSize: 5 },
    { skip: user?.role !== 'Super Administrator' },
  );
  const [submissionError, setSubmissionError] = useState<ServerValidationErrors<FormData> | null>(null);

  useEffect(() => {
    if (error) {
      notificationService.showErrorMessage('Unable to load agent. Returning to agent list.');
      navigate('/agents', { replace: true });
    }
    if (agentHistoryError) {
      notificationService.showErrorMessage("Unable to load the agent's change history.");
    }
  }, [error, navigate, agentHistoryError]);

  const handleShowAllChanges = () => {
    // console.log('handleShowAllChanges');
  };

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
      if (isFetchBaseQueryError(error)) {
        if (isErrorResponse<FormData>(error?.data)) {
          setSubmissionError(error?.data?.error);
        }
      }
      notificationService.showErrorMessage('Unable to update agent.');
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

      <FormCard>
        <Card.Body>
          <WithLoadingOverlay
            isLoading={isLoadingAgent || isFetching}
            isInitialLoad={isLoadingAgent && isFetching}
            containerHasRoundedCorners
            containerBorderRadius='6px'
          >
            <StyledFormWrapper>
              <AgentDetailForm
                defaultValues={agent}
                submitButtonLabel='Save'
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                serverValidationErrors={submissionError}
              />
            </StyledFormWrapper>
          </WithLoadingOverlay>
        </Card.Body>
      </FormCard>
      <div className='mt-3'>
        {agentHistory ? (
          <ChangeLog
            changeList={agentHistory.results}
            totalChanges={agentHistory.meta.count}
            editorTextColor={AppTheme.changelogs.accentTextColor}
            handleShowAllChanges={handleShowAllChanges}
          />
        ) : null}
      </div>
    </SmallContainer>
  );
};
