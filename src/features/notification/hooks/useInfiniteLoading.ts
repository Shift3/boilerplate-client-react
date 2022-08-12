import { Notification } from 'common/models/notification';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getCount, getMeta, getNextCursor, getResults } from '../utility/utilities';
import { useNotifications } from './useNotifications';

interface Props {
  getItems: (cursorObject: { cursorLink: string }, readType: string, token: string | null) => Promise<Response>;
  readType: string;
  token: string | null;
}

export const useInfiniteLoading = (props: Props) => {
  const { getItems, readType, token } = props;
  const [items, setItems] = useState<Notification[]>([]);
  const [hasMore, setHasMore] = useState(true);
  // const [nextCursorLink, setNextCursorLink] = useState<string | null>(null);
  const initialPageLoaded = useRef(false);
  // const { setUnread, setRead, unreadNotifications, readNotifications } = useNotifications();
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
        // setUnread([...unreadNotifications, ...results]);
        notificationDispatch({
          type: 'append to unread notifications',
          unreadNotifications: results,
          unreadMetaObject: meta ?? undefined,
          totalUnreadCount: count ?? 0,
          unreadNextCursorLink: nextCursor ?? undefined,
        });
      } else if (readType === 'read') {
        // setRead([...readNotifications, ...results]);
        notificationDispatch({
          type: 'append to read notifications',
          readNotifications: results,
          readMetaObject: meta ?? undefined,
          totalReadCount: count ?? 0,
          readNextCursorLink: nextCursor ?? undefined,
        });
      }

      // setNextCursorLink(nextCursor ?? null);
    },
    [getItems, readType, token, notificationDispatch],
  );

  // useEffect(() => {
  //   if (initialPageLoaded.current) {
  //     return;
  //   }

  //   // if (readType === 'unread' && notificationState.unreadNotifications.length === 0) {
  //   //   loadItems(nextCursorLink ?? '');
  //   // }

  //   // if (readType === 'read' && notificationState.readNotifications.length === 0) {
  //   //   loadItems(nextCursorLink ?? '');
  //   // }

  //   initialPageLoaded.current = true;
  // }, [
  //   loadItems,
  //   nextCursorLink,
  //   readType,
  //   notificationState.unreadNotifications.length,
  //   notificationState.readNotifications.length,
  // ]);

  return {
    items: readType === 'unread' ? notificationState.unreadNotifications : notificationState.readNotifications,
    hasMore,
    loadItems,
    nextCursorLink:
      readType === 'unread' ? notificationState.unreadNextCursorLink : notificationState.readNextCursorLink,
  };
};
