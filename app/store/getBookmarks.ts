import * as $rdf from 'rdflib';
import getBookmarksDataModule from './bookmarksDataModule';

export async function getBookmarks(store: $rdf.IndexedFormula, webId: string): Promise<$rdf.Node[]> {
  const bookmarks = getBookmarksDataModule(store);
  const storages = await bookmarks.discoverStorage(webId);
  console.log(storages);
  return [];
}
