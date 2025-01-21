import React from 'react';

/** Button that lets the user log in with Solid. */
export default function LoginButton({
  popup,
  children = 'Log in',
  className = 'solid auth login',
}) {
  return <button
    className={className}
    onClick={() => {}}>{children}</button>;
}
