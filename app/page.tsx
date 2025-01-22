'use client'

import React, { useEffect, useState } from "react";
import { handleIncomingRedirect, ISessionInfo, login, logout } from "@inrupt/solid-client-authn-browser";
import "regenerator-runtime/runtime";
import LoggedIn from './components/LoggedIn';
import LoginButton from './components/LoginButton';
import LoggedOut from './components/LoggedOut';
import LogoutButton from './components/LogoutButton';
import LinkSaver from './components/LinkSaver';

const REDIRECT_URL = "http://localhost:3000/";
// This is an example IRI where the Client identifier document (i.e. ../client-app-profile.jsonld)
// is available to the OIDC issuer. See https://solid.github.io/solid-oidc/#clientids-document
// for more information. Note that the URL of the document should match its `client_id` field.
// const CLIENT_IDENTIFIER = "https://example.org/your-client-id";

export default function App() {
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo|undefined>();
  const [issuer] = useState("https://pivot.pondersource.com/");
  useEffect(() => {
    // After redirect, the current URL contains login information.
    handleIncomingRedirect({
      restorePreviousSession: true,
      // onError: errorHandle,
    }).then((info) => {
      console.log('redirect handled', info);
      setSessionInfo(info);
    });
  }, [sessionInfo]);

  // const errorHandle = (error, errorDescription) => {
  //   console.log(`${error} has occured: `, errorDescription);
  // };
  const handleLogin = () => {
    // The default behaviour of the button is to resubmit.
    // Login will redirect the user away so that they can log in the OIDC issuer,
    // and back to the provided redirect URL (which should be controlled by your app).
    login({
      redirectUrl: REDIRECT_URL,
      oidcIssuer: issuer,
      clientName: "Demo app",
      // clientId: CLIENT_IDENTIFIER,
    });
  };

  const handleLogout = () => {
    logout();
    // The following has no impact on the logout, it just resets the UI.
    setSessionInfo(undefined);
  };
  return (
    <div>  
      <LoggedIn sessionInfo={sessionInfo}>
        <div>
          <LinkSaver sessionInfo={sessionInfo}/>
          <footer className="footer">
            <div className="container">
              <LogoutButton className="button is-pulled-right" handleLogout={handleLogout}>Disconnect</LogoutButton>
            </div>
          </footer>
        </div>
      </LoggedIn>
      <LoggedOut sessionInfo={sessionInfo}>
        <section className="section">
          <div className="container">
            <LoginButton className="button is-large is-primary" handleLogin={handleLogin}>
              Connect to start bookmarking
            </LoginButton>
          </div>
        </section>
      </LoggedOut>
    </div>
  );
}