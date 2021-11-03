import { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PageWrapper, Title, StyledFormWrapper } from '../../styles/PageStyles';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { useGetAgencyByIdQuery, useUpdateAgencyMutation } from 'common/api/agencyApi';
import * as notificationService from 'common/services/notification';

export interface RouteParams {
  id: string;
}

export const UpdateAgencyView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const [updateAgency] = useUpdateAgencyMutation();
  const { data: agency, isLoading: isLoadingAgency, error } = useGetAgencyByIdQuery(id);

  useEffect(() => {
    if (error) {
      notificationService.showErrorMessage('Unable to load agency. Returning to agency list.');
      history.replace('/agencies');
    }
  }, [error, history]);

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateAgency({ id: Number(id), ...data }).unwrap();
      notificationService.showSuccessMessage('Agency updated.');
      history.push('/agencies');
    } catch (error) {
      notificationService.showErrorMessage('Unable to update agency.');
    }
  };

  return (
    <PageWrapper>
      <WithLoadingOverlay isLoading={isLoadingAgency}>
        <StyledFormWrapper>
          <Title>Update Agency</Title>
          <AgencyDetailForm
            defaultValues={{ agencyName: agency?.agencyName ?? '' }}
            submitButtonLabel='UPDATE'
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </StyledFormWrapper>
      </WithLoadingOverlay>
    </PageWrapper>
  );
};
