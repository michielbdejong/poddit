import React from 'react';

import { login } from "@inrupt/solid-client-authn-browser";

const REDIRECT_URL = "http://localhost:3000/";
const issuer = "https://pivot.pondersource.com";

/** Button that lets the user log in with Solid. */
export default function LoginButton({
  children = 'Log in',
  className = 'solid login',
  handleLogin = () => {},
}) {
  return <button
    className={className}
    onClick={handleLogin}>{children}</button>;
}
