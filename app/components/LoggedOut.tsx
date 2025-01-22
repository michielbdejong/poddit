
import { ISessionInfo } from "@inrupt/solid-client-authn-browser";
import { JSX } from 'react';

/** Pane that only shows its contents when the user is logged out. */
export default function LoggedOut({ children = null,  sessionInfo }: { children: JSX.Element | JSX.Element[] | null,  sessionInfo: ISessionInfo|undefined}) {
  const loggedIn = sessionInfo?.isLoggedIn;
  return loggedIn ? null : children;
}
