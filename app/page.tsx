import { LoggedIn, LogoutButton, LoggedOut, LoginButton } from '@solid/react';
import { LinkSaver } from './components/LinkSaver';

export default function Home() {
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
