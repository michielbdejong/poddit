import * as $rdf from 'rdflib';
import getBookmarksDataModule, { getBookmarkStorages } from './bookmarksDataModule';
import { Bookmark } from '../../lib/interfaces';

/** Generate secure random string values in Javascript using cryto-random bytes */
function randomHash (len: number) {
  return Array.from(
      window.crypto.getRandomValues(new Uint8Array(Math.ceil(len / 2))),
      (b) => ("0" + (b & 0xFF).toString(16)).slice(-2)
  ).join("")
}
export async function storeBookmark(store: $rdf.IndexedFormula, webId: string, bookmark: Bookmark): Promise<string> {
  const bookmarks = getBookmarksDataModule(store);
  const storages: string[] = await getBookmarkStorages(bookmarks, webId);
  console.log(storages);
  if (storages.length >= 1) {
    const storageUrl = `${storages[0]}#${randomHash(16)}`;
    await bookmarks.createBookmark({
      storageUrl,
      title: bookmark.title,
      url: bookmark.url
    })
    return storageUrl;
  } else {
    throw new Error('no place discovered for storing bookmarks');
  }
}
