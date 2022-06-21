import { Notification } from 'common/models/notification';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getNextCursor, getResults } from '../utility/utilities';

interface Props {
  getItems: (cursorObj: { cursorLink: string }) => Promise<Response>;
}

export const useInfiniteLoading = (props: Props) => {
  const { getItems } = props;
  const [items, setItems] = useState<Notification[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursorLink, setNextCursorLink] = useState<string | null>(null);
  const initialPageLoaded = useRef(false);

  const loadItems = useCallback(
    async (cursorLink: string) => {
      const data = await getItems({
        cursorLink,
      });

      const nextCursor = getNextCursor(data);
      const results = getResults(data) ?? [];

      setHasMore(nextCursor !== null);
      setItems(prevItems => [...prevItems, ...results]);
      setNextCursorLink(nextCursor ?? null);
    },
    [getItems],
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
