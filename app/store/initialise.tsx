import * as $rdf from 'rdflib';
import { SOLID, PIM, DC, BOOKMARK, RDF } from '../../lib/namespaces';
import { fetch } from "@inrupt/solid-client-authn-browser";

export async function initialise(store: $rdf.IndexedFormula, webId: string): Promise<$rdf.Node> {
  const registry = await registerBookmarkIndex(store, webId);
  const index = await initialiseBookmarkIndex(store, registry);
  return index;
}

async function registerBookmarkIndex(store: $rdf.IndexedFormula, webId: string): Promise<$rdf.Node> {
  const profile = store.sym(webId);
  const fetcher = new $rdf.Fetcher(store, { fetch });
  const typeIndex = store.any(profile, SOLID('publicTypeIndex'), undefined, undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (fetcher as any).load(typeIndex);
  let bookmarkRegistry = store.any(undefined, SOLID('forClass'), BOOKMARK('Bookmark'), undefined);
  if (typeof bookmarkRegistry === 'undefined') {
    const storage = store.any(profile, PIM('storage'), undefined, undefined);
    const registryFilename = `${storage!.value}public/poddit.ttl`;
    const bookmarkIndex = $rdf.sym(`${typeIndex!.value}#poddit`);
    const insertions = [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $rdf.st(typeIndex as any, DC('references'), bookmarkIndex, typeIndex as any),
      $rdf.st(bookmarkIndex, RDF('type'), SOLID('TypeRegistration'), bookmarkIndex.doc()),
      $rdf.st(bookmarkIndex, SOLID('forClass'), BOOKMARK('Bookmark'), bookmarkIndex.doc()),
      $rdf.st(bookmarkIndex, SOLID('instance'), $rdf.sym(registryFilename), bookmarkIndex.doc()),
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updater = new ($rdf as any).UpdateManager(store);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updater.update([], insertions, (_uri: string, _ok: boolean, _message: string) => { });
    bookmarkRegistry = store.any(bookmarkIndex, SOLID('instance'), undefined, undefined);
  }
  return bookmarkRegistry!;
}

async function initialiseBookmarkIndex(store: $rdf.IndexedFormula, bookmarkRegistry: $rdf.Node): Promise<$rdf.Node> {
  const fetcher = new $rdf.Fetcher(store, { fetch });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookmarkIndex = store.any(bookmarkRegistry as any, SOLID('instance'), undefined, undefined);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (fetcher as any).load(bookmarkIndex);
  }
  catch {
    const newIndex = $rdf.sym(bookmarkIndex!.value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (fetcher as any).putBack(newIndex);
  }
  return bookmarkIndex!;
}
