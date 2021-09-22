import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useGetAgencyByIdQuery, useUpdateAgencyMutation } from '../agencyApi';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';
import { UpdateAgencyForm, UpdateAgencyFormData } from '../components/UpdateAgencyForm';

export interface RouteParams {
  id: string;
}

export const UpdateAgencyView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const [updateAgency] = useUpdateAgencyMutation();
  const { data: agency, isLoading, error } = useGetAgencyByIdQuery(id);

  useEffect(() => {
    if (error) {
      showErrorNotification('Unable to load agency. Returning to agency list.');
      history.replace('/agencies');
    }
  }, [error, history, showErrorNotification]);

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: UpdateAgencyFormData) => {
    const { agencyName } = data;
    try {
      await updateAgency({ id: Number(id), agencyName }).unwrap();
      showSuccessNotification('Agency updated.');
      history.push('/agencies');
    } catch (error) {
      showErrorNotification('Unable to update agency.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      {/* TODO: add loading spinner */}
      {!isLoading && !error && (
        <StyledFormWrapper>
          <StyledFormTitle>Update Agency</StyledFormTitle>
          <UpdateAgencyForm
            defaultValues={{ agencyName: agency?.agencyName ?? '' }}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </StyledFormWrapper>
      )}
    </Container>
  );
};
