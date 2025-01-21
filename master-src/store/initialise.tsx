import * as $rdf from 'rdflib';
import { SOLID, PIM, DC, BOOKMARK, RDF } from '../namespaces';

export async function initialise(store: $rdf.IndexedFormula, webId: string): Promise<$rdf.Node> {
  const registry = await registerBookmarkIndex(store, webId);
  const index = await initialiseBookmarkIndex(store, registry);
  return index;
}

async function registerBookmarkIndex(store: $rdf.IndexedFormula, webId: string): Promise<$rdf.Node> {
  const profile = store.sym(webId);
  const fetcher = new $rdf.Fetcher(store, {});
  const typeIndex = store.any(profile, SOLID('publicTypeIndex'), undefined, undefined);
  await (fetcher as any).load(typeIndex);
  let bookmarkRegistry = store.any(undefined, SOLID('forClass'), BOOKMARK('Bookmark'), undefined);
  if (typeof bookmarkRegistry === 'undefined') {
    const storage = store.any(profile, PIM('storage'), undefined, undefined);
    const registryFilename = `${storage.value}public/poddit.ttl`;
    const bookmarkIndex = $rdf.sym(`${typeIndex.value}#poddit`);
    const insertions = [
      $rdf.st(typeIndex, DC('references'), bookmarkIndex, typeIndex),
      $rdf.st(bookmarkIndex, RDF('type'), SOLID('TypeRegistration'), bookmarkIndex.doc()),
      $rdf.st(bookmarkIndex, SOLID('forClass'), BOOKMARK('Bookmark'), bookmarkIndex.doc()),
      $rdf.st(bookmarkIndex, SOLID('instance'), $rdf.sym(registryFilename), bookmarkIndex.doc()),
    ];
    const updater = new ($rdf as any).UpdateManager(store);
    updater.update([], insertions, (uri: string, ok: boolean, message: string) => { });
    bookmarkRegistry = store.any(bookmarkIndex, SOLID('instance'), undefined, undefined);
  }
  return bookmarkRegistry;
}

async function initialiseBookmarkIndex(store: $rdf.IndexedFormula, bookmarkRegistry: $rdf.Node): Promise<$rdf.Node> {
  const fetcher = new $rdf.Fetcher(store, {});
  const bookmarkIndex = store.any(bookmarkRegistry, SOLID('instance'), undefined, undefined);
  try {
    await (fetcher as any).load(bookmarkIndex);
  }
  catch {
    const newIndex = $rdf.sym(bookmarkIndex.value);
    await (fetcher as any).putBack(newIndex);
  }
  return bookmarkIndex;
}
