import React, { Component } from 'react';
import './App.css';
import { LoggedIn, LogoutButton, LoggedOut, LoginButton } from '@solid/react';
import { LinkSaver } from './components/LinkSaver';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoggedIn>
          <LinkSaver/>
          <LogoutButton/>
        </LoggedIn>
        <LoggedOut>
          <LoginButton popup="popup.html"/>
        </LoggedOut>
      </div>
    );
  }
}

export default App;
