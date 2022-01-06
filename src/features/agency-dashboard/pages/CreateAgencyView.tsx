import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';
import { useCreateAgencyMutation } from 'common/api/agencyApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { BreadcrumbComponent } from 'common/components/Breadcrumb';

export const CreateAgencyView: FC = () => {
  const history = useHistory();
  const [createAgency] = useCreateAgencyMutation();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createAgency(data).unwrap();
      notificationService.showSuccessMessage('Agency created.');
      history.push('/agencies');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add agency.');
    }
  };

  return (
    <PageWrapper>
      <BreadcrumbComponent path={['Home', 'Agency List', 'Create Agency']}/>
      <StyledFormWrapper>
        <Title>Create Agency</Title>
        <AgencyDetailForm submitButtonLabel='CREATE' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
