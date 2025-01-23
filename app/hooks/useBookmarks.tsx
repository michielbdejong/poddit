import * as React from 'react';
import * as $rdf from 'rdflib';

import useWebId from './useWebId';
import { getBookmarks } from '../store/getBookmarks';

export function useBookmarks(store?: $rdf.IndexedFormula) {
  const webId = useWebId();
  const [bookmarks, setBookmarks] = React.useState<$rdf.Node[]>();

  React.useEffect(() => {
    if (store && webId) {
      (async () => {
        const bookmarks = await getBookmarks(store, webId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetcher = new ($rdf as any).Fetcher(store);
        await fetcher.load(bookmarks.map(bookmark => bookmark.value));
        setBookmarks(bookmarks);
      })();
    }
  }, [store, webId]);

  return bookmarks;
}
