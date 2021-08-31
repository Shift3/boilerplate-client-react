import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { useCreateAgencyMutation } from '../agencyApi';
import { CreateAgencyForm, CreateAgencyFormData } from '../components/CreateAgencyForm';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';

export const CreateAgencyView: FC = () => {
  const history = useHistory();
  const [createAgency] = useCreateAgencyMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: CreateAgencyFormData) => {
    try {
      await createAgency(data).unwrap();
      showSuccessNotification('Agency created.');
      history.push('/agencies');
    } catch (error) {
      showErrorNotification('Unable to add agency.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>Create Agency</StyledFormTitle>
        <CreateAgencyForm onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </Container>
  );
};
