import React from 'react';

import { logout } from "@inrupt/solid-client-authn-browser";

/** Button that lets the user log out with Solid. */
export default function LogoutButton({
  children = 'Log out',
  className = 'solid auth logout',
  handleLogout = () => {}
}) {
  return <button
    className={className}
    onClick={handleLogout}>{children}</button>;
}
