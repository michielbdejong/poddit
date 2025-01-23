import React from 'react';

/** Button that lets the user log in with Solid. */
export default function LoginButton({
  children = 'Log in',
  className = 'solid login',
  handleLogin = () => {},
}) {
  return <button
    className={className}
    onClick={(handleLogin)}>{children}</button>;
}
