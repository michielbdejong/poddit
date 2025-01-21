import useLoggedOut from '../hooks/useLoggedOut';
import { JSX } from 'react';

/** Pane that only shows its contents when the user is logged out. */
export default function LoggedOut({ children = null }: { children: JSX.Element | JSX.Element[] | null}) {
  const loggedOut = useLoggedOut();
  return loggedOut ? children : null;
}
