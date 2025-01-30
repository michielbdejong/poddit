import * as React from 'react';
import * as $rdf from 'rdflib';
import { fetch } from '@inrupt/solid-client-authn-browser';

import useWebId from './useWebId';
import { getBookmarks } from '../store/getBookmarks';

export function useBookmarks(store?: $rdf.IndexedFormula) {
  const webId = useWebId();
  const [bookmarks, setBookmarks] = React.useState<$rdf.Node[]>();

  React.useEffect(() => {
    if (store && webId) {
      (async () => {
        const bookmarks = await getBookmarks(store, webId);
        const fetcher = new $rdf.Fetcher(store, { fetch });
        await fetcher.load(bookmarks.map(bookmark => bookmark.value));
        setBookmarks(bookmarks);
      })();
    }
  }, [store, webId]);

  return bookmarks;
}
