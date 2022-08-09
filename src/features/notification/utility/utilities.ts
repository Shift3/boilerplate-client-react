import { isObject } from 'common/error/utilities';
import { Notification } from 'common/models/notification';
import { environment } from 'environment';

export const getCount = (data: unknown): number | null => {
  if (isObject(data)) {
    if (isObject(data.meta) && typeof data.meta.count === 'number') {
      return data.meta.count;
    }

    return null;
  }

  return null;
};

export const getMeta = (data: unknown): Record<string, unknown> | null => {
  if (isObject(data)) {
    if (isObject(data.meta)) {
      return data.meta;
    }
  }

  return null;
};

export const getNextCursor = (data: unknown): string | null => {
  if (isObject(data)) {
    if (isObject(data.links)) {
      if (typeof data.links.next === 'string') {
        return data.links.next;
      }
      if (data.links.next === null) {
        return data.links.next;
      }
    }
    return null;
  }
  return null;
};

export const isNotification = (item: unknown): item is Notification => {
  if (isObject(item)) {
    if (item.type) {
      return true;
    }
  }
  return false;
};

export const isNotificationArray = (notifications: unknown): notifications is Notification[] => {
  if (Array.isArray(notifications)) {
    let arrayOnlyContainsNotifications = true;
    notifications.forEach(item => {
      if (!isNotification(item)) {
        arrayOnlyContainsNotifications = false;
      }
    });
    return arrayOnlyContainsNotifications;
  }

  return false;
};

export const getResults = (data: unknown): Notification[] | null => {
  if (isObject(data)) {
    if (isNotificationArray(data.results)) {
      return data.results;
    }
  }
  return null;
};

export const getNotifications = async (
  cursorObject: { cursorLink: string },
  readType: string,
  token: string | null,
): Promise<Response> => {
  let newURL = '';
  const { cursorLink } = cursorObject;

  const cursorIndex = cursorLink.indexOf('cursor');

  if (cursorIndex !== -1) {
    newURL = `${cursorLink.substring(cursorIndex)}`;
  } else if (readType === 'unread') {
    newURL = 'read__isnull=true';
  } else if (readType === 'read') {
    newURL = 'read__isnull=false';
  }

  return fetch(`${environment.apiRoute}/notifications/?${newURL}`, {
    headers: { Authorization: `Token ${token}` },
  }).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw response;
  });
};
