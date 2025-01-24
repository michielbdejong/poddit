'use client'

import { useState, useEffect } from "react";
import { login, logout, ISessionInfo, handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
import "regenerator-runtime/runtime";
import LoggedIn from './components/LoggedIn';
import LoginButton from './components/LoginButton';
import LoggedOut from './components/LoggedOut';
import LogoutButton from './components/LogoutButton';
import LinkSaver from './components/LinkSaver';
import { SessionInfoContext } from './hooks/useSessionInfo';

const REDIRECT_URL = "https://poddit.app/";
const CLIENT_IDENTIFIER = "https://poddit.app/clientid.jsonld";
// This is an example IRI where the Client identifier document (i.e. ../client-app-profile.jsonld)
// is available to the OIDC issuer. See https://solid.github.io/solid-oidc/#clientids-document
// for more information. Note that the URL of the document should match its `client_id` field.
// const CLIENT_IDENTIFIER = "https://example.org/your-client-id";

export default function App() {
  const [issuer] = useState("https://pivot.pondersource.com/");
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo|undefined>();
  useEffect(() => {
    // After redirect, the current URL contains login information.
    handleIncomingRedirect({
    restorePreviousSession: true,
    }).then((info) => {
    setSessionInfo(info);
    });
  }, []);
  const handleLogin = () => {
    login({
      redirectUrl: REDIRECT_URL,
      oidcIssuer: issuer,
      clientName: "poddit",
      clientId: CLIENT_IDENTIFIER,
    });
  };

  const handleLogout = () => {
    logout();
    setSessionInfo(undefined);
  };
  return (
    <div>
      <SessionInfoContext.Provider value={sessionInfo}>
        <LoggedIn>
          <div>
            <LinkSaver/>
            <footer className="footer">
              <div className="container">
                <LogoutButton className="button is-pulled-right" handleLogout={handleLogout}>Disconnect</LogoutButton>
              </div>
            </footer>
          </div>
        </LoggedIn>
        <LoggedOut>
          <section className="section">
            <div className="container">
              <LoginButton className="button is-large is-primary" handleLogin={handleLogin}>
                Connect to start bookmarking
              </LoginButton>
            </div>
          </section>
        </LoggedOut>
      </SessionInfoContext.Provider>
    </div>
  );
} 