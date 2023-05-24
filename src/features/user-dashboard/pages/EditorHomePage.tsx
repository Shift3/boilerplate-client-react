import { FC } from 'react';
import { PageHeader } from 'common/styles/page';
import { Container } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { TableCard } from 'common/styles/card';
import { NoContent } from 'common/styles/utilities';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const EditorHomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>{t('editorHomePage.heading')}</h1>
          <p>{t('editorHomePage.subheading')}</p>
        </div>
      </PageHeader>
      <TableCard>
        <NoContent
          title={
            <p className='lead mb-0'>
              <Trans i18nKey='editorHomePage.placeholder'>
                This is the homepage for <strong>Editor</strong> users. Replace this content with whatever you would
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
