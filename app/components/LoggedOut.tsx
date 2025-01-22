import useLoggedIn from '../hooks/useLoggedIn';
import { JSX } from 'react';

/** Pane that only shows its contents when the user is logged out. */
export default function LoggedOut({ children = null }: { children: JSX.Element | JSX.Element[] | null}) {
  const [ loggedIn ] = useLoggedIn();
  console.log('displaying LoggedOut?', !loggedIn);
  return loggedIn ? null : children;
}
