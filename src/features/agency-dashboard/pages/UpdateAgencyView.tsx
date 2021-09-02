import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC, useLayoutEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useGetAgenciesQuery, useUpdateAgencyMutation } from '../agencyApi';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';
import { UpdateAgencyForm, UpdateAgencyFormData } from '../components/UpdateAgencyForm';

export interface RouteParams {
  id: string;
}

export const UpdateAgencyView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const [updateAgency] = useUpdateAgencyMutation();
  const { agency } = useGetAgenciesQuery(undefined, {
    selectFromResult: ({ data: agencies }) => ({
      agency: agencies?.find((agency) => agency.id === Number(id)),
    }),
  });
  const { showErrorNotification, showSuccessNotification } = useShowNotification();

  useLayoutEffect(() => {
    if (Number.isNaN(Number(id)) || !agency) {
      showErrorNotification('Unable to load agency. Returning to agency list.');
      history.replace('/agencies');
    }
  }, [id, history, agency, showErrorNotification]);

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
      <StyledFormWrapper>
        <StyledFormTitle>Update Agency</StyledFormTitle>
        <UpdateAgencyForm
          defaultValues={{ agencyName: agency?.agencyName ?? '' }}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </StyledFormWrapper>
    </Container>
  );
};
