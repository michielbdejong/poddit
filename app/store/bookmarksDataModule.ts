import * as $rdf from 'rdflib';
import BookmarksModuleRdfLib, { BookmarksModule, BookmarkStorage } from "@solid-data-modules/bookmarks-rdflib";
import { fetch } from "@inrupt/solid-client-authn-browser";

export default function getBookmarksDataModule(store: $rdf.IndexedFormula): BookmarksModule {
  const fetcher = new $rdf.Fetcher(store, { fetch });
  const updater = new $rdf.UpdateManager(store);
  return new BookmarksModuleRdfLib({store, fetcher, updater});
}

export async function getBookmarkStorages(module: BookmarksModule, webId: string): Promise<string[]> {
  const storage: BookmarkStorage = await module.discoverStorage(webId);
  return storage.privateUrls.concat(storage.publicUrls);
}