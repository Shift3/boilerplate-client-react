import { useCallback, useState } from 'react';
import { getCount, getMeta, getNextCursor, getResults } from '../utility/utilities';
import { useNotifications } from './useNotifications';

interface Props {
  getItems: (cursorObject: { cursorLink: string }, readType: string, token: string | null) => Promise<Response>;
  readType: string;
  token: string | null;
}

export const useInfiniteLoading = (props: Props) => {
  const { getItems, readType, token } = props;
  const [hasMore, setHasMore] = useState(true);
  const { notificationState, notificationDispatch } = useNotifications();

  const loadItems = useCallback(
    async (cursorLink: string) => {
      const data = await getItems({ cursorLink }, readType, token);

      const nextCursor = getNextCursor(data);
      const results = getResults(data) ?? [];
      const meta = getMeta(data);
      const count = getCount(data);

      setHasMore(nextCursor !== null);

      if (readType === 'unread') {
        notificationDispatch({
          type: 'append to unread notifications',
          unreadNotifications: results,
          unreadMetaObject: meta ?? undefined,
          totalUnreadCount: count ?? 0,
          unreadNextCursorLink: nextCursor ?? undefined,
        });
      } else if (readType === 'read') {
        notificationDispatch({
          type: 'append to read notifications',
          readNotifications: results,
          readMetaObject: meta ?? undefined,
          totalReadCount: count ?? 0,
          readNextCursorLink: nextCursor ?? undefined,
        });
      }
    },
    [getItems, readType, token, notificationDispatch],
  );

  return {
    items: readType === 'unread' ? notificationState.unreadNotifications : notificationState.readNotifications,
    hasMore,
    loadItems,
    nextCursorLink:
      readType === 'unread' ? notificationState.unreadNextCursorLink : notificationState.readNextCursorLink,
  };
};
