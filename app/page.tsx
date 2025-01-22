'use client'

import React, { useEffect } from "react";
import { handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
import "regenerator-runtime/runtime";
import useWebId from './hooks/useWebId';
import useLoggedIn from './hooks/useLoggedIn';
import LoggedIn from './components/LoggedIn';
import LoginButton from './components/LoginButton';
import LoggedOut from './components/LoggedOut';
import LogoutButton from './components/LogoutButton';
import { LinkSaver } from './components/LinkSaver';

// This is an example IRI where the Client identifier document (i.e. ../client-app-profile.jsonld)
// is available to the OIDC issuer. See https://solid.github.io/solid-oidc/#clientids-document
// for more information. Note that the URL of the document should match its `client_id` field.
// const CLIENT_IDENTIFIER = "https://example.org/your-client-id";

export default function App() {
  const [webId, setWebId] = useWebId();
  const [, setLoggedIn] = useLoggedIn();
  useEffect(() => {
    // After redirect, the current URL contains login information.
    handleIncomingRedirect({
      restorePreviousSession: true,
      // onError: errorHandle,
    }).then((info) => {
      console.log('redirect handled', info);
      setWebId(info ? info.webId : undefined);
      setLoggedIn(info ? info.isLoggedIn : false);
    });
  }, [webId]);

  // const errorHandle = (error, errorDescription) => {
  //   console.log(`${error} has occured: `, errorDescription);
  // };
  return (
    <div>  
      <LoggedIn>
        <div>
          <LinkSaver/>
          <footer className="footer">
            <div className="container">
              <LogoutButton className="button is-pulled-right">Disconnect</LogoutButton>
            </div>
          </footer>
        </div>
      </LoggedIn>
      <LoggedOut>
        <section className="section">
          <div className="container">
            <LoginButton className="button is-large is-primary">
              Connect to start bookmarking
            </LoginButton>
          </div>
        </section>
      </LoggedOut>
    </div>
  );
}