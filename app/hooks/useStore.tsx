import * as React from 'react';
import * as $rdf from 'rdflib';
import { fetch } from "@inrupt/solid-client-authn-browser";
import useWebId from './useWebId';

export function useStore() {
  const webId = useWebId();
  const [ store, setStore ] = React.useState<$rdf.IndexedFormula>();

  React.useEffect(() => {
    if (webId) {
      const store = $rdf.graph();
      console.log('webId', webId);
      const profile = store.sym(webId);
      const fetcher = new $rdf.Fetcher(store, { fetch });
      console.log('fetcher', fetcher);
      (async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log('fetching profile', profile, profile.doc());
        await (fetcher as any).load(profile.doc());
        console.log('setting store', store);
        setStore(store);
      })();
    }
  }, [webId]);

  return store;
}
