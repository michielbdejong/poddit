import * as $rdf from 'rdflib';
import { initialise } from './initialise';
import { RDF, BOOKMARK } from '../../lib/namespaces';

export async function getBookmarks(store: $rdf.IndexedFormula, webId: string): Promise<$rdf.Node[]> {
  await initialise(store, webId);
  const bookmarks = store.each(undefined, RDF('type'), BOOKMARK('Bookmark'), undefined);
  console.log('in store', bookmarks);
  return bookmarks;
}
