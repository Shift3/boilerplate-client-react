import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { CircularContainer } from 'common/styles/utilities';
import styled from 'styled-components';
import { HistoricalRecord } from 'common/models/historicalRecord';
import { User } from 'common/models';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

export type Props = {
  changeList: HistoricalRecord<User>[];
};

const StyledCircularContainer = styled(CircularContainer)`
  background-color: lightgrey;
  height: 32px;
  width: 32px;
`;

const StyledListGroupItem = styled.ol`
  background-color: ${props => props.theme.changelogs.backgroundColor};

  div.ms-3 {
    span.changeTypeName {
      color: ${props => props.theme.changelogs.textColor};
    }
    span.editorName {
      color: ${props => props.theme.changelogs.accentTextColor};
    }
  }
`;

export const ChangeListGroup: FC<Props> = ({ changeList }) => {
  const { t } = useTranslation(['translation', 'common']);

  const getShortenedName = (fullName: string): string => {
    const nameArray: string[] = fullName.split(' ');

    return `${nameArray[0]} ${nameArray[1].charAt(0)}.`;
  };

  const getChangeTypeData = (changeType: string): { changeName: string; icon: IconProp } => {
    switch (changeType) {
      case '+':
        return { changeName: t('createdBy', { ns: 'common' }), icon: 'circle-plus' };
      case '~':
        return { changeName: t('updatedBy', { ns: 'common' }), icon: 'pen' };
      case '-':
        return { changeName: t('deletedBy', { ns: 'common' }), icon: 'trash-can' };
      default:
        throw Error("Given changeType does not equal '+', '~', or '-'");
    }
  };

  return (
    <ListGroup as='ol'>
      {changeList.map(changeItem => {
        const changeTypeData = getChangeTypeData(changeItem.historyType);

        return (
          <StyledListGroupItem
            key={changeItem.historyId}
            as='ol'
            className='d-flex justify-content-start align-items-center list-group-item'
          >
            <StyledCircularContainer>
              <FontAwesomeIcon icon={changeTypeData.icon} />
            </StyledCircularContainer>
            <div className='ms-3'>
              <span className='changeTypeName'>{`${changeTypeData.changeName}`}</span>{' '}
              <span className='editorName'>
                {changeItem.historyUser
                  ? getShortenedName(`${changeItem.historyUser.firstName} ${changeItem.historyUser.lastName}`)
                  : t('system', { ns: 'common' })}
              </span>
              <span className='text-muted d-block'>{format(parseISO(changeItem.historyDate), 'MMM d, h:mm a')}</span>
            </div>
          </StyledListGroupItem>
        );
      })}
    </ListGroup>
  );
};
