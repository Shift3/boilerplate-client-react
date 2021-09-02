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
  // eslint-disable-next-line no-undefined
  const { agency } = useGetAgenciesQuery(undefined, {
    selectFromResult: ({ data: agencies }) => ({
      agency: agencies?.find((agency) => agency.id === Number(id)),
    }),
  });

  useLayoutEffect(() => {
    if (Number.isNaN(Number(id)) || !agency) {
      history.replace('/agencies');
    }
  }, [id, history, agency]);

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: UpdateAgencyFormData) => {
    const { agencyName } = data;
    try {
      await updateAgency({ id: Number(id), agencyName }).unwrap();
    } catch (error) {
      console.log(error);
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
