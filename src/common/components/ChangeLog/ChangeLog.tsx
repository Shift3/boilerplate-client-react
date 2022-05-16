import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FC } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { CircularContainer } from 'common/styles/utilities';

export type Props = {
  changeList: unknown[];
  totalChanges: number;
  editorTextColor: string;
  changePropertyAccessor?: (change: unknown, propertyName: string) => string | number;
  getChangeItemAction?: (action: string) => string;
  handleShowAllChanges: () => void;
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

const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === 'object';
};

const isStringOrNumber = (value: unknown): value is string | number => {
  return typeof value === 'string' || typeof value === 'number';
};

const getIconForAction = (action: string): IconProp => {
  switch (action) {
    case 'create':
      return 'circle-plus';
    case 'update':
      return 'pen';
    case 'delete':
      return 'trash-can';
    default:
      return 'question'; // if the action isn't recognized
  }
};

const defaultPropertyAccessor = (change: unknown, propertyName: string): string | number => {
  if (isObject(change)) {
    const value = change[propertyName];

    if (isStringOrNumber(value)) {
      return value;
    }

    throw Error(`The resulting value from change[${propertyName}] is not a string or a number`);
  }

  throw Error('Given change parameter is not an object');
};

const defaultGetChangeItemAction = (action: string): string => {
  switch (action) {
    case 'create':
      return action;
    case 'update':
      return action;
    case 'destroy':
      return 'delete';
    default:
      throw Error("Given action does not equal 'create', 'update', or 'destroy'");
  }
};

export const ChangeLog: FC<Props> = ({
  changeList,
  totalChanges,
  editorTextColor,
  changePropertyAccessor = defaultPropertyAccessor,
  getChangeItemAction = defaultGetChangeItemAction,
  handleShowAllChanges,
}) => {
  return (
    <>
      {changeList.length > 0 ? (
        <div>
          <h5 className='mb-3'>Latest Changes</h5>
          <ListGroup as='ol'>
            {changeList.map(changeItem => {
              const itemType = changePropertyAccessor(changeItem, 'itemType').toString();
              const id = changePropertyAccessor(changeItem, 'id');
              const changeAction = getChangeItemAction(changePropertyAccessor(changeItem, 'action').toString());
              const creationDate = changePropertyAccessor(changeItem, 'createdAt').toString();
              const editorName = changePropertyAccessor(changeItem, 'whoDisplay').toString();

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
          {totalChanges > changeList.length ? (
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
