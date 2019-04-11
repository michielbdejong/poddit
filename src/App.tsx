import React, { Component } from 'react';
import { LoggedIn, LogoutButton, LoggedOut, LoginButton } from '@solid/react';
import { LinkSaver } from './components/LinkSaver';

class App extends Component {
  render() {
    return (
      <div>
        
        <LoggedIn>
          <LinkSaver/>
          <footer className="footer">
            <div className="container">
              <LogoutButton className="button is-pulled-right"/>
            </div>
          </footer>
        </LoggedIn>
        <LoggedOut>
          <section className="section">
            <div className="container">
              <LoginButton popup="popup.html" className="button is-large is-primary">
                Log in to start bookmarking
              </LoginButton>
            </div>
          </section>
        </LoggedOut>
      </div>
    );
  }
}

export default App;
