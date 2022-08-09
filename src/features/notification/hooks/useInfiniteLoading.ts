import { Notification } from 'common/models/notification';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getNextCursor, getResults } from '../utility/utilities';

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

  const loadItems = useCallback(
    async (cursorLink: string) => {
      const data = await getItems({ cursorLink }, readType, token);

      const nextCursor = getNextCursor(data);
      const results = getResults(data) ?? [];

      setHasMore(nextCursor !== null);
      setItems(prevItems => [...prevItems, ...results]);
      setNextCursorLink(nextCursor ?? null);
    },
    [getItems, readType, token],
  );

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    loadItems(nextCursorLink ?? '');
    initialPageLoaded.current = true;
  }, [loadItems, nextCursorLink]);

  return {
    items,
    hasMore,
    loadItems,
    nextCursorLink,
  };
};
