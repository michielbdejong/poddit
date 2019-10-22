import { createContext, useContext } from 'react';
import { ISessionInfo } from '@inrupt/solid-client-authn-browser';


export const SessionInfoContext = createContext<ISessionInfo|undefined>(undefined);

export default function useSessionInfo() {
  const sessionInfo = useContext(SessionInfoContext);
  return sessionInfo;
}
