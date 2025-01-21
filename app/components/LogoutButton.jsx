import React from 'react';

/** Button that lets the user log out with Solid. */
export default function LogoutButton({
  children = 'Log out',
  className = 'solid auth logout',
}) {
  return <button
    className={className}
    onClick={() => {}}>{children}</button>;
}
