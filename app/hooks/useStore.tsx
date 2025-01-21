import * as React from 'react';
import * as $rdf from 'rdflib';
import { useWebId } from '@solid/react';

export function useStore() {
  const webId = useWebId();
  const [store, setStore] = React.useState<$rdf.IndexedFormula>();

  React.useEffect(() => {
    if (webId) {
      const store = $rdf.graph();
      const profile = store.sym(webId);
      const fetcher = new $rdf.Fetcher(store, {});
      (async () => {
        await (fetcher as any).load(profile.doc());
        setStore(store);
      })();
    }
  }, [webId]);

  return store;
}
