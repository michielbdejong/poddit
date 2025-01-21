import * as $rdf from 'rdflib';

import { initialise } from './initialise';
import { DC, XSD, BOOKMARK, RDF } from '../namespaces';
import { Bookmark } from '../interfaces';

export async function storeBookmark(store: $rdf.IndexedFormula, webId: string, bookmark: Bookmark): Promise<$rdf.Node> {
  const bookmarkIndex = await initialise(store, webId);
  const fetcher = new $rdf.Fetcher(store, {});
  let storedBookmark = store.any(undefined, BOOKMARK('recalls'), bookmark.url, undefined);
  if (typeof storedBookmark === 'undefined') {
    const newBookmark = $rdf.sym(bookmarkIndex.value + '#' + Math.random() + '.ttl');
    store.add(bookmarkIndex, DC('references'), newBookmark, bookmarkIndex),
      store.add(newBookmark, RDF('type'), BOOKMARK('Bookmark'), newBookmark.doc()),
      store.add(newBookmark, DC('created'), $rdf.lit(bookmark.created.toISOString(), null as any, XSD('dateTime')), newBookmark.doc()),
      store.add(newBookmark, BOOKMARK('recalls'), $rdf.lit(bookmark.url, null as any, XSD('string')), newBookmark.doc()),
      store.add(newBookmark, DC('title'), $rdf.lit(bookmark.title, null as any, XSD('string')), newBookmark.doc()),
      await (fetcher as any).putBack(newBookmark);
    storedBookmark = store.any(undefined, BOOKMARK('recalls'), undefined, undefined);
  }
  return storedBookmark;
}
