import React from 'react';

import { logout } from "@inrupt/solid-client-authn-browser";
import useWebId from '../hooks/useWebId';

/** Button that lets the user log out with Solid. */
export default function LogoutButton({
  children = 'Log out',
  className = 'solid auth logout',
}) {
  const [, setWebId] = useWebId();
  return <button
    className={className}
    onClick={(e) => {
      e.preventDefault();
      logout();
      // The following has no impact on the logout, it just resets the UI.
      setWebId(undefined);
    }}>{children}</button>;
}
