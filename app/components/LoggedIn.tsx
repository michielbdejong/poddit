import useLoggedIn from '../hooks/useLoggedIn';
import { JSX } from 'react';

/** Pane that only shows its contents when the user is logged in. */
export default function LoggedIn({ children = null }: { children: JSX.Element | JSX.Element[] | null}) {
  const [ loggedIn] = useLoggedIn();
  console.log('displaying LoggedIn?', loggedIn);
  return loggedIn ? children : null;
}
