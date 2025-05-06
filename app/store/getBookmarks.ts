import * as $rdf from 'rdflib';
import { BookmarksModule, Bookmark } from "@solid-data-modules/bookmarks-rdflib";

import getBookmarksDataModule, { getBookmarkStorages }  from './bookmarksDataModule';

export async function getBookmarks(store: $rdf.IndexedFormula, webId: string): Promise<Bookmark[]> {
  const bookmarks: BookmarksModule = getBookmarksDataModule(store);
  const storages: string[] = await getBookmarkStorages(bookmarks, webId);
  let items: Bookmark[] = [];
  const promises = storages.map(async storage => {
    const harvest = await bookmarks.listBookmarks(storage);
    console.log(storage, harvest);
    items = items.concat(harvest);
  });
  await Promise.all(promises);
  console.log(storages, items);
  return items;
}
