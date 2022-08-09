import { Notification } from 'common/models/notification';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getNextCursor, getResults } from '../utility/utilities';
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
  const [nextCursorLink, setNextCursorLink] = useState<string | null>(null);
  const initialPageLoaded = useRef(false);
  const { setUnread, setRead, unreadNotifications, readNotifications } = useNotifications();

  const loadItems = useCallback(
    async (cursorLink: string) => {
      const data = await getItems({ cursorLink }, readType, token);

      const nextCursor = getNextCursor(data);
      const results = getResults(data) ?? [];

      setHasMore(nextCursor !== null);

      if (readType === 'unread') {
        setUnread([...unreadNotifications, ...results]);
      } else if (readType === 'read') {
        setRead([...readNotifications, ...results]);
      }

      setNextCursorLink(nextCursor ?? null);
    },
    [getItems, readType, token, unreadNotifications, readNotifications, setUnread, setRead],
  );

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    if (readType === 'unread' && unreadNotifications.length === 0) {
      loadItems(nextCursorLink ?? '');
    }

    if (readType === 'read' && readNotifications.length === 0) {
      loadItems(nextCursorLink ?? '');
    }

    initialPageLoaded.current = true;
  }, [loadItems, nextCursorLink, readType, unreadNotifications, readNotifications]);

  return {
    items: readType === 'unread' ? unreadNotifications : readNotifications,
    hasMore,
    loadItems,
    nextCursorLink,
  };
};
