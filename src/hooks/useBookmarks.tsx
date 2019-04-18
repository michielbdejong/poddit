import * as React from 'react';
import * as $rdf from 'rdflib';

import { useWebId } from '@solid/react';
import { getBookmarks } from '../store/getBookmarks';

export function useBookmarks(store?: $rdf.IndexedFormula) {
  const webId = useWebId();
  const [bookmarks, setBookmarks] = React.useState<$rdf.Node[]>();

  React.useEffect(() => {
    if (store && webId) {
      (async () => {
        const bookmarks = await getBookmarks(store, webId);
        const fetcher = new ($rdf as any).Fetcher(store);
        await fetcher.load(bookmarks.map(bookmark => bookmark.value));
        setBookmarks(bookmarks);
      })();
    }
  }, [store, webId]);

  return bookmarks;
}
