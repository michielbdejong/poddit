import React, { Component } from 'react';
import { LoggedIn, LogoutButton, LoggedOut, LoginButton } from '@solid/react';
import auth from 'solid-auth-client';
import { LinkSaver } from './components/LinkSaver';

class App extends Component {
  async login (identityProvider: string | null) {
    if (!identityProvider) {
      return;
    }

    const session = await auth.currentSession();
    if (!session) {
      auth.login(identityProvider);
    }
  }

  render() {
    if (URLSearchParams && document.location.search.length > 0) {
      const params = new URLSearchParams(document.location.search.substring(1));
      if (params.has('idp')) {
        this.login(params.get('idp'));
        return (
          <div>Logging you in, please stand by&hellip;</div>
        );
      }
    }

    return (
      <div>
        
        <LoggedIn>
          <LinkSaver/>
          <footer className="footer">
            <div className="container">
              <LogoutButton className="button is-pulled-right">Disconnect</LogoutButton>
            </div>
          </footer>
        </LoggedIn>
        <LoggedOut>
          <section className="section">
            <div className="container">
              <LoginButton popup="popup.html" className="button is-large is-primary">
                Connect to start bookmarking
              </LoginButton>
            </div>
          </section>
        </LoggedOut>
      </div>
    );
  }
}

export default App;
