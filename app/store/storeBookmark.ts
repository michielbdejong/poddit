import * as $rdf from 'rdflib';
import { fetch } from "@inrupt/solid-client-authn-browser";

import { initialise } from './initialise';
import { DC, XSD, BOOKMARK, RDF } from '../../lib/namespaces';
import { Bookmark } from '../../lib/interfaces';

export async function storeBookmark(store: $rdf.IndexedFormula, webId: string, bookmark: Bookmark): Promise<$rdf.Node> {
  const bookmarkIndex = await initialise(store, webId);
  const fetcher = new $rdf.Fetcher(store, { fetch });
  // TypeScript is saying that the 3rd argument can't be a string but I don't think that's true - MdJ
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storedBookmark = store.any(undefined, BOOKMARK('recalls'), bookmark.url as any, undefined);
  if (typeof storedBookmark === 'undefined') {
    const newBookmark = $rdf.sym(bookmarkIndex.value + '#' + Math.random() + '.ttl');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.add(bookmarkIndex as any, DC('references'), newBookmark, bookmarkIndex as any);
    store.add(newBookmark, RDF('type'), BOOKMARK('Bookmark'), newBookmark.doc());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.add(newBookmark, DC('created'), $rdf.lit(bookmark.created.toISOString(), null as any, XSD('dateTime')), newBookmark.doc());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.add(newBookmark, BOOKMARK('recalls'), $rdf.lit(bookmark!.url, null as any, XSD('string')), newBookmark.doc());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.add(newBookmark, DC('title'), $rdf.lit(bookmark.title, null as any, XSD('string')), newBookmark.doc());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (fetcher as any).putBack(newBookmark);
    storedBookmark = store.any(undefined, BOOKMARK('recalls'), undefined, undefined);
  }
  return storedBookmark!;
}
