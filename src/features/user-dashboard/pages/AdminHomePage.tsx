import { FC } from 'react';
import { PageHeader } from 'common/styles/page';
import { Container } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { TableCard } from 'common/styles/card';
import { NoContent } from 'common/styles/utilities';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

export const AdminHomePage: FC = () => {
  return (
    <Container>
      <PageHeader>
        <div>
          <h1>
            <Trans i18nKey='adminHomePage.heading'>Admin Home Page</Trans>
          </h1>
          <p>
            <Trans i18nKey='adminHomePage.subheading'>Placeholder homepage for admins</Trans>
          </p>
        </div>
      </PageHeader>
      <TableCard>
        <NoContent title='Nothing to see here' icon={faGhost} />
      </TableCard>
    </Container>
  );
};
