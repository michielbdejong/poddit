import React from 'react';

import { login } from "@inrupt/solid-client-authn-browser";

const REDIRECT_URL = "http://localhost:3000/";
const issuer = "https://pivot.pondersource.com";

/** Button that lets the user log in with Solid. */
export default function LoginButton({
  children = 'Log in',
  className = 'solid login',
}) {
  return <button
    className={className}
    onClick={(e) => {
      // The default behaviour of the button is to resubmit.
      // This prevents the page from reloading.
      e.preventDefault();
      // Login will redirect the user away so that they can log in the OIDC issuer,
      // and back to the provided redirect URL (which should be controlled by your app).
      login({
        redirectUrl: REDIRECT_URL,
        oidcIssuer: issuer,
        clientName: "Demo app",
        // clientId: CLIENT_IDENTIFIER,
      });
  }}>{children}</button>;
}
