import useSessionInfo from './useSessionInfo';

export default function useLoggedIn() {
  const sessionInfo = useSessionInfo();
  return sessionInfo ? sessionInfo.isLoggedIn : undefined;
}
