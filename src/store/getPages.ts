import * as $rdf from 'rdflib';
import { initialise } from './initialise';
import { AS } from '../namespaces';

export async function getPages(store: $rdf.IndexedFormula, webId: string): Promise<$rdf.Node[]> {
  await initialise(store, webId);
  const pages = store.each(undefined, AS('type'), AS('Page'), undefined);
  return pages;
}
