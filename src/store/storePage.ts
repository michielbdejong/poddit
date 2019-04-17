import * as $rdf from 'rdflib';

import { initialise } from './initialise';
import { AS, PURL, XSD } from '../namespaces';
import { Page } from "../interfaces";

export async function storePage(store: $rdf.IndexedFormula, webId: string, page: Page): Promise<$rdf.Node> {
  const pageIndex = await initialise(store, webId);
  const fetcher = new $rdf.Fetcher(store, {});
  let storedPage = store.any(undefined, AS('url'), page.url, undefined);
  if (typeof storedPage === 'undefined') {
    const newPage = $rdf.sym(pageIndex.value + '#' + Math.random() + '.ttl');
    store.add(pageIndex, PURL('references'), newPage, pageIndex),
      store.add(newPage, AS('type'), AS('Page'), newPage.doc()),
      store.add(newPage, AS('url'), $rdf.lit(page.url, null as any, XSD('string')), newPage.doc()),
      store.add(newPage, AS('name'), $rdf.lit(page.title, null as any, XSD('string')), newPage.doc()),
      await (fetcher as any).putBack(newPage);
    storedPage = store.any(undefined, AS('url'), undefined, undefined);
  }
  return storedPage;
}
