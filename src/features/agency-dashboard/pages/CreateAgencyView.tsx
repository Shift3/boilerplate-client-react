import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';
import { useCreateAgencyMutation } from 'common/api/agencyApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { Breadcrumb } from 'react-bootstrap';

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
      <Title>Create Agency</Title>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}} >
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/agencies'}} >
          Agency List
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Create Agency
        </Breadcrumb.Item>
      </Breadcrumb>
      <StyledFormWrapper>
        <AgencyDetailForm submitButtonLabel='CREATE' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
