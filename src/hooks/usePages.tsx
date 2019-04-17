import * as React from 'react';
import * as $rdf from 'rdflib';

import { useWebId } from '@solid/react';
import { getPages } from '../store/getPages';

export function usePages(store?: $rdf.IndexedFormula) {
  const webId = useWebId();
  const [pages, setPages] = React.useState<$rdf.Node[]>();

  React.useEffect(() => {
    if (store && webId) {
      (async () => {
        const pages = await getPages(store, webId);
        const fetcher = new ($rdf as any).Fetcher(store);
        await fetcher.load(pages.map(page => page.value));
        setPages(pages);
      })();
    }
  }, [store, webId]);

  return pages;
}
