import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useGetAgencyByIdQuery, useUpdateAgencyMutation } from '../agencyApi';
import { Title, StyledFormWrapper } from '../../styles/PageStyles';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';

export interface RouteParams {
  id: string;
}

export const UpdateAgencyView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const [updateAgency] = useUpdateAgencyMutation();
  const { data: agency, isLoading: isLoadingAgency, error } = useGetAgencyByIdQuery(id);

  useEffect(() => {
    if (error) {
      showErrorNotification('Unable to load agency. Returning to agency list.');
      history.replace('/agencies');
    }
  }, [error, history, showErrorNotification]);

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateAgency({ id: Number(id), ...data }).unwrap();
      showSuccessNotification('Agency updated.');
      history.push('/agencies');
    } catch (error) {
      showErrorNotification('Unable to update agency.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
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
    </Container>
  );
};
