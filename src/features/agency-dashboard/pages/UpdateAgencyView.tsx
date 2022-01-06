import { FC, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { useGetAgencyByIdQuery, useUpdateAgencyMutation } from 'common/api/agencyApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { Breadcrumb } from 'react-bootstrap';

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
      <Title>Update Agency</Title>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}} >
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/agencies'}} >
          Agency List
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Update Agency
        </Breadcrumb.Item>
      </Breadcrumb>
      <WithLoadingOverlay isLoading={isLoadingAgency}>
        <StyledFormWrapper>
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
