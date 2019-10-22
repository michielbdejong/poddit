import useSessionInfo from './useSessionInfo';

export default function useWebId() {
  const sessionInfo = useSessionInfo();
  return sessionInfo ? sessionInfo.webId : undefined;
}
