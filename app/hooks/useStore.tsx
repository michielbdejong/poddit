import * as React from 'react';
import * as $rdf from 'rdflib';
import useWebId from './useWebId';

export function useStore() {
  const webId = useWebId();
  const [ store, setStore ] = React.useState<$rdf.IndexedFormula>();

  React.useEffect(() => {
    if (webId) {
      const store = $rdf.graph();
      console.log('webId', webId);
      const profile = store.sym(webId);
      const fetcher = new $rdf.Fetcher(store, {});
      (async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (fetcher as any).load(profile.doc());
        setStore(store);
      })();
    }
  }, [webId]);

  return store;
}
