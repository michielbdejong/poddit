import * as React from 'react';
import * as $rdf from 'rdflib';
import { Bookmark } from "@solid-data-modules/bookmarks-rdflib";
import useWebId from './useWebId';
import { getBookmarks } from '../store/getBookmarks';

export function useBookmarks(store?: $rdf.IndexedFormula) {
  const webId = useWebId();
  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>();

  React.useEffect(() => {
    if (store && webId) {
      (async () => {
        const bookmarks: Bookmark[] = await getBookmarks(store, webId);
        setBookmarks(bookmarks);
      })();
    }
  }, [store, webId]);

  return bookmarks;
}
