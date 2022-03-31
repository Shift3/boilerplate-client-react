export const hasOwnProperty = <X extends Record<string, unknown>, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> => {
  return Object.hasOwnProperty.call(obj, prop);
};

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === 'object';
};

export const isStringOrNumber = (value: unknown): value is string | number => {
  return typeof value === 'string' || typeof value === 'number';
};

export const throwPropertyCannotBeFoundOrInvalidTypeError = (propertyName: string): Error => {
  return Error(`${propertyName} can't be found or change.${propertyName} is not a string or number`);
};

// For nestjs-changelog
export const changePropertyAccessor = (change: unknown, propertyName: string): string | number => {
  if (isObject(change) && !hasOwnProperty(change, 'createdAt')) {
    throw Error('Invalid change object');
  }

  if (isObject(change)) {
    if (propertyName === 'creationDate') {
      if (hasOwnProperty(change, 'createdAt') && isStringOrNumber(change.createdAt)) {
        return change.createdAt;
      }

      throw throwPropertyCannotBeFoundOrInvalidTypeError('createdAt');
    } else if (propertyName === 'editorName') {
      if (hasOwnProperty(change, 'whoDisplay') && isStringOrNumber(change.whoDisplay)) {
        return change.whoDisplay;
      }

      throw throwPropertyCannotBeFoundOrInvalidTypeError('whoDisplay');
    } else if (propertyName === 'id') {
      if (hasOwnProperty(change, 'id') && isStringOrNumber(change.id)) {
        return change.id;
      }

      throw throwPropertyCannotBeFoundOrInvalidTypeError('id');
    } else if (propertyName === 'itemType') {
      if (hasOwnProperty(change, 'itemType') && isStringOrNumber(change.itemType)) {
        return change.itemType;
      }

      throw throwPropertyCannotBeFoundOrInvalidTypeError('itemType');
    } else if (propertyName === 'changeAction') {
      if (hasOwnProperty(change, 'action') && isStringOrNumber(change.action)) {
        return change.action;
      }

      throw throwPropertyCannotBeFoundOrInvalidTypeError('action');
    } else {
      throw Error('Invalid property name given');
    }
  } else {
    throw Error('Given change parameter is not an object');
  }
};
// For nestjs-changelog
export const getChangeItemAction = (action: string): string => {
  switch (action) {
    case 'create':
      return 'create';
    case 'update':
      return 'update';
    case 'destroy':
      return 'delete';
    default:
      return action;
  }
};
