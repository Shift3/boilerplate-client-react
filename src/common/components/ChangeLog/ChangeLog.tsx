import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPen, faQuestion, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FC } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { CircularContainer } from 'common/components/Common';

export type Props = {
  changeList: unknown[];
  totalChanges: number;
  maxItemsToDisplay: number;
  editorTextColor: string;
  changePropertyAccessor: (change: unknown, propertyName: string) => string | number;
  getChangeItemAction: (action: string) => string;
  handleShowAllChanges: () => void;
};

const getDateValue = (dateStr: string): number => {
  return new Date(dateStr).valueOf();
};

const getActionInPastTense = (action: string): string => {
  return `${action.charAt(0).toUpperCase()}${action.substring(1)}d`;
};

const getShortenedName = (fullName: string): string => {
  const nameArray: string[] = fullName.split(' ');

  return `${nameArray[0]} ${nameArray[1].charAt(0)}.`;
};

const getDateStr = (date: Date): string => {
  return date.toLocaleString(undefined, { month: 'short', day: 'numeric' });
};

const getTimeStr = (date: Date): string => {
  return date.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
};

const getIconForAction = (action: string): IconDefinition => {
  switch (action) {
    case 'create':
      return faCirclePlus;
    case 'update':
      return faPen;
    case 'delete':
      return faTrashCan;
    default:
      return faQuestion; // if the action isn't recognized
  }
};

export const ChangeLog: FC<Props> = ({
  changeList,
  totalChanges,
  maxItemsToDisplay,
  editorTextColor,
  changePropertyAccessor,
  getChangeItemAction,
  handleShowAllChanges,
}) => {
  let changeItems = [...changeList];

  changeItems?.sort(
    (changeA, changeB) =>
      getDateValue(changePropertyAccessor(changeB, 'creationDate').toString()) -
      getDateValue(changePropertyAccessor(changeA, 'creationDate').toString()),
  );

  if (changeItems.length > maxItemsToDisplay) {
    changeItems = changeItems.slice(0, maxItemsToDisplay);
  }

  return (
    <>
      {changeItems.length > 0 ? (
        <div>
          <h5 className='mb-3'>Latest Changes</h5>
          <ListGroup as='ol'>
            {changeItems.map(changeItem => {
              const itemType = changePropertyAccessor(changeItem, 'itemType').toString();
              const id = changePropertyAccessor(changeItem, 'id');
              const changeAction = getChangeItemAction(changePropertyAccessor(changeItem, 'changeAction').toString());
              const creationDate = changePropertyAccessor(changeItem, 'creationDate').toString();
              const editorName = changePropertyAccessor(changeItem, 'editorName').toString();

              return (
                <ListGroup.Item
                  key={`${itemType}-${id}`}
                  as='ol'
                  className='d-flex justify-content-start align-items-center'
                >
                  <CircularContainer radius={32} backgroundColor='lightgrey'>
                    <FontAwesomeIcon icon={getIconForAction(changeAction)} />
                  </CircularContainer>
                  <div className='ms-3'>
                    <span>{`${getActionInPastTense(changeAction)} by `}</span>
                    <span style={{ color: editorTextColor }}>{getShortenedName(editorName)}</span>
                    <span className='text-muted d-block'>{`${getDateStr(new Date(creationDate))} ${getTimeStr(
                      new Date(creationDate),
                    )}`}</span>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          {totalChanges > maxItemsToDisplay ? (
            <div className='d-flex w-100 justify-content-center mt-3'>
              <Button
                variant='link'
                onClick={() => handleShowAllChanges()}
                className='text-decoration-none'
                style={{ color: editorTextColor }}
              >{`Show all ${totalChanges} changes...`}</Button>
            </div>
          ) : null}
        </div>
      ) : (
        <h5 className='mt-3 mb-3'>No Changes Found</h5>
      )}
    </>
  );
};
