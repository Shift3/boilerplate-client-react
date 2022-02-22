import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateAgencyMutation } from 'common/api/agencyApi';
import { FormCard, PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';

export const CreateAgencyView: FC = () => {
  const history = useHistory();
  const [createAgency] = useCreateAgencyMutation();

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
    <HolyGrailLayout>
      <SmallContainer>
        <PageCrumb>
          <Link to='/agencies'>
            <FontAwesomeIcon icon={['fas', 'chevron-left']} /> Back to Agency List
          </Link>
        </PageCrumb>

        <PageHeader>
          <div>
            <h1>Create Agency</h1>
            <p className='text-muted'>Create a new agency.</p>
          </div>
        </PageHeader>

        <FormCard>
          <Card.Body>
            <StyledFormWrapper>
              <AgencyDetailForm submitButtonLabel='Create' onSubmit={handleFormSubmit} />
            </StyledFormWrapper>
          </Card.Body>
        </FormCard>
      </SmallContainer>
    </HolyGrailLayout>
  );
};
