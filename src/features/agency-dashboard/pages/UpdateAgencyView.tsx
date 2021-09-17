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
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const [updateAgency] = useUpdateAgencyMutation();
  // Since the AgencyListView is subscribed to the query and we just want to pick an item from that query,
  // we do not need to perform an additional request here. Instead, we can use the `selectFromResult` option
  // to get a specific item from the cached query result. For more info, see the following RTK Query docs
  // https://redux-toolkit.js.org/rtk-query/usage/queries#selecting-data-from-a-query-result.
  const { agency } = useGetAgenciesQuery(undefined, {
    selectFromResult: ({ data: agencies }) => ({
      agency: agencies?.find((agency) => agency.id === Number(id)),
    }),
  });

  // Since a user can manually type in any random id into the url, we need to ensure `id` is a string that represents
  // a valid number, and that `id` is a valid agency id for one of the agencies from the query result in the list view.
  // useLayoutEffect` is used instead of `useEffect` so that the check and redirect occur before the component gets
  // rendered for the first time to the screen.
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
