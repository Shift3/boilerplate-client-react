import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useCreateAgencyMutation } from '../agencyApi';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';
import { PageWrapper, Title, StyledFormWrapper } from '../../styles/PageStyles';

export const CreateAgencyView: FC = () => {
  const history = useHistory();
  const [createAgency] = useCreateAgencyMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createAgency(data).unwrap();
      showSuccessNotification('Agency created.');
      history.push('/agencies');
    } catch (error) {
      showErrorNotification('Unable to add agency.');
    }
  };

  return (
    <PageWrapper>
      <StyledFormWrapper>
        <Title>Create Agency</Title>
        <AgencyDetailForm submitButtonLabel='CREATE' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
