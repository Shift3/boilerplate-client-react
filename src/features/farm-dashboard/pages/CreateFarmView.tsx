import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateFarmMutation } from 'common/api/farmApi';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { isObject } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { Card } from 'react-bootstrap';
import { PageCrumb, PageHeader, SmallContainer } from 'common/styles/page';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FarmDetailForm, FormData } from 'features/farm-dashboard/components/FarmDetailForm';

export const CreateFarmView: FC = () => {
  const navigate = useNavigate();
  const [createFarm] = useCreateFarmMutation();
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const handleFormCancel = () => {
    navigate(-1);
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createFarm({ ...data, thumbnail: 'https://shift3tech.com/images/s3-logo-white.svg' }).unwrap();
      notificationService.showSuccessMessage('Farm created.');
      navigate('/farms');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add farm.');
      if (error && isFetchBaseQueryError(error)) {
        if (isObject(error.data)) {
          setFormValidationErrors(error.data);
        } else {
          throw error;
        }
      }
    }
  };

  return (
    <SmallContainer>
      <PageCrumb>
        <Link to='/farms'>
          <FontAwesomeIcon icon={['fas', 'chevron-left']} /> Back to Farm List
        </Link>
      </PageCrumb>
      <PageHeader>
        <div>
          <h1>Create Farm</h1>
          <p className='text-muted'>Add a new farm to the system.</p>
        </div>
      </PageHeader>

      <Card>
        <Card.Body>
          <FarmDetailForm
            submitButtonLabel='Create'
            onCancel={handleFormCancel}
            onSubmit={handleFormSubmit}
            serverValidationErrors={formValidationErrors}
          />
        </Card.Body>
      </Card>
    </SmallContainer>
  );
};
