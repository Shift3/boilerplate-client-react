import { FC } from 'react';
import { PageHeader } from 'common/styles/page';
import { Container } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { TableCard } from 'common/styles/card';
import { NoContent } from 'common/styles/utilities';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const AdminHomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>{t('adminHomePage.heading')}</h1>
          <p>{t('adminHomePage.subheading')}</p>
        </div>
      </PageHeader>
      <TableCard>
        <NoContent
          title={
            <p className='lead mb-0'>
              <Trans i18nKey="adminHomePage.placeholder">
                This is the homepage for <strong>Admin</strong> users. Replace this content with whatever you would
                like!
              </Trans>
            </p>
          }
          icon={faExclamationCircle}
        />
      </TableCard>
    </Container>
  );
};
