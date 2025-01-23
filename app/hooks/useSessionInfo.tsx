import { useEffect, useState } from 'react';

import { handleIncomingRedirect, ISessionInfo } from "@inrupt/solid-client-authn-browser";

export default function useSessionInfo() {
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo|undefined>();
  useEffect(() => {
    // After redirect, the current URL contains login information.
    handleIncomingRedirect({
    restorePreviousSession: true,
    // onError: errorHandle,
    }).then((info) => {
    console.log('redirect handled', info);
    setSessionInfo(info);
    });
  }, []);
  return sessionInfo;
}