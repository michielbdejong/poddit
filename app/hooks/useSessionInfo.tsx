import { useContext } from 'react';
import { SessionInfoContext } from '../page';

export default function useSessionInfo() {
  const sessionInfo = useContext(SessionInfoContext);
  return sessionInfo;
}