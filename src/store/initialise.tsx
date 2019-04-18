import * as $rdf from 'rdflib';
import { SOLID, AS, PIM, DC } from '../namespaces';

export async function initialise(store: $rdf.IndexedFormula, webId: string): Promise<$rdf.Node> {
  const registry = await registerPageIndex(store, webId);
  const index = await initialisePageIndex(store, registry);
  return index;
}

async function registerPageIndex(store: $rdf.IndexedFormula, webId: string): Promise<$rdf.Node> {
  const profile = store.sym(webId);
  const fetcher = new $rdf.Fetcher(store, {});
  const typeIndex = store.any(profile, SOLID('publicTypeIndex'), undefined, undefined);
  await (fetcher as any).load(typeIndex);
  let pageRegistry = store.any(undefined, SOLID('forClass'), AS('Page'), undefined);
  if (typeof pageRegistry === 'undefined') {
    const storage = store.any(profile, PIM('storage'), undefined, undefined);
    const registryFilename = `${storage.value}public/poddit.ttl`;
    const pageIndex = $rdf.sym(`${typeIndex.value}#poddit`);
    const insertions = [
      $rdf.st(typeIndex, DC('references'), pageIndex, typeIndex),
      $rdf.st(pageIndex, AS('type'), SOLID('TypeRegistration'), pageIndex.doc()),
      $rdf.st(pageIndex, SOLID('forClass'), AS('Page'), pageIndex.doc()),
      $rdf.st(pageIndex, SOLID('instance'), $rdf.sym(registryFilename), pageIndex.doc()),
    ];
    const updater = new ($rdf as any).UpdateManager(store);
    updater.update([], insertions, (uri: string, ok: boolean, message: string) => { });
    pageRegistry = store.any(pageIndex, SOLID('instance'), undefined, undefined);
  }
  return pageRegistry;
}

async function initialisePageIndex(store: $rdf.IndexedFormula, pageRegistry: $rdf.Node): Promise<$rdf.Node> {
  const fetcher = new $rdf.Fetcher(store, {});
  const pageIndex = store.any(pageRegistry, SOLID('instance'), undefined, undefined);
  try {
    await (fetcher as any).load(pageIndex);
  }
  catch {
    const newIndex = $rdf.sym(pageIndex.value);
    await (fetcher as any).putBack(newIndex);
  }
  return pageIndex;
}
