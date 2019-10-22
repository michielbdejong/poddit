import { JSX } from 'react';
import useLoggedIn from '../hooks/useLoggedIn';

/** Pane that only shows its contents when the user is logged in. */
export default function LoggedIn({ children = null }: { children: JSX.Element | JSX.Element[] | null}) {
  const loggedIn = useLoggedIn();
  return loggedIn ? children : null;
}
