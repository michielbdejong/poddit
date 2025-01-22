'use client'

import { useEffect } from 'react';

import {
  // login,
  // logout,
  handleIncomingRedirect,
  // fetch,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";

const REDIRECT_URL = "http://localhost:3000/";

let webId, setWebId;

/**
 * Returns the WebID (string) of the active user,
 * `null` if there is no user,
 * or `undefined` if the user state is pending.
 */
export default function useWebId() {
  [webId, setWebId] = useState(getDefaultSession().info.webId);
  console.log('useWebId', webId);
  return webId;
}

// The useEffect hook is executed on page load, and in particular when the user
// is redirected to the page after logging in the identity provider.
useEffect(() => {
  // After redirect, the current URL contains login information.
  handleIncomingRedirect({
    restorePreviousSession: true,
    onError: errorHandle,
  }).then((info) => {
    setWebId(info.webId);
  });
}, [webId]);
