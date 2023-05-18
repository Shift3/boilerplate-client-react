import { FC } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { HistoricalRecord } from 'common/models/historicalRecord';
import { User } from 'common/models';
import { ChangeListGroup } from './ChangeListGroup';
import { Trans, useTranslation } from 'react-i18next';

export type Props = {
  changeList: HistoricalRecord<User>[];
  previewSize: number;
  totalChanges: number;
  handleShowAllChanges: () => void;
};

const StyledShowAllChangesButton = styled(Button)`
  color: ${props => props.theme.changelogs.accentTextColor};
`;

export const ChangeLog: FC<Props> = ({ changeList, previewSize, totalChanges, handleShowAllChanges }) => {
  const { t } = useTranslation(['translation', 'common']);
  return (
    <>
      {changeList.length > 0 ? (
        <div>
          <h5 className='mb-3'>{t('latestChanges')}</h5>
          <ChangeListGroup changeList={changeList.slice(0, previewSize)} />
          {totalChanges > previewSize ? (
            <div className='d-flex w-100 justify-content-center mt-3'>
              <StyledShowAllChangesButton
                variant='link'
                onClick={() => handleShowAllChanges()}
                className='text-decoration-none'
              >
                <Trans i18nKey="changeLog.showAllNChanges" count={totalChanges}>
                  Show all {totalChanges} changes...
                </Trans>
              </StyledShowAllChangesButton>
            </div>
          ) : null}
        </div>
      ) : (
        <h5 className='mt-3 mb-3'>{t('noChangesFound')}</h5>
      )}
    </>
  );
};
