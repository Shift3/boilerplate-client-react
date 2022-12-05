import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { CircularContainer } from 'common/styles/utilities';
import styled from 'styled-components';
import moment from 'moment';
import { HistoricalRecord } from 'common/models/historicalRecord';
import { User } from 'common/models';

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
  const getShortenedName = (fullName: string): string => {
    const nameArray: string[] = fullName.split(' ');

    return `${nameArray[0]} ${nameArray[1].charAt(0)}.`;
  };

  const getChangeTypeData = (changeType: string): { changeName: string; icon: IconProp } => {
    switch (changeType) {
      case '+':
        return { changeName: 'Created', icon: 'circle-plus' };
      case '~':
        return { changeName: 'Updated', icon: 'pen' };
      case '-':
        return { changeName: 'Deleted', icon: 'trash-can' };
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
              <span className='changeTypeName'>{`${changeTypeData.changeName} by `}</span>
              <span className='editorName'>
                {changeItem.historyUser
                  ? getShortenedName(`${changeItem.historyUser.firstName} ${changeItem.historyUser.lastName}`)
                  : 'System'}
              </span>
              <span className='text-muted d-block'>{moment(changeItem.historyDate).format('MMM D, h:mm a')}</span>
            </div>
          </StyledListGroupItem>
        );
      })}
    </ListGroup>
  );
};
