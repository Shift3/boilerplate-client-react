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
import { useTranslation } from 'react-i18next';

export const CreateFarmView: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  const navigate = useNavigate();
  const [createFarm] = useCreateFarmMutation();
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const handleFormCancel = () => {
    navigate(-1);
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createFarm({ ...data, thumbnail: 'https://shift3tech.com/images/s3-logo-white.svg' }).unwrap();
      notificationService.showSuccessMessage(t('createFarm.farmCreated'));
      navigate('/farms');
    } catch (error) {
      notificationService.showErrorMessage(t('createFarm.unableToAddFarm'));
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
          <FontAwesomeIcon icon={['fas', 'chevron-left']} /> {t('createFarm.backToFarmList')}
        </Link>
      </PageCrumb>
      <PageHeader>
        <div>
          <h1>{t('createFarm.createFarm')}</h1>
          <p className='text-muted'>{t('createFarm.addFarmToSystem')}</p>
        </div>
      </PageHeader>

      <Card>
        <Card.Body>
          <FarmDetailForm
            submitButtonLabel={t('create', { ns: 'common' }) ?? undefined}
            onCancel={handleFormCancel}
            onSubmit={handleFormSubmit}
            serverValidationErrors={formValidationErrors}
          />
        </Card.Body>
      </Card>
    </SmallContainer>
  );
};
