import { JSX } from 'react';
import { ISessionInfo } from "@inrupt/solid-client-authn-browser";

/** Pane that only shows its contents when the user is logged in. */
export default function LoggedIn({ children = null,  sessionInfo }: { children: JSX.Element | JSX.Element[] | null,  sessionInfo: ISessionInfo|undefined}) {
  const loggedIn = sessionInfo?.isLoggedIn;
  return loggedIn ? children : null;
}
