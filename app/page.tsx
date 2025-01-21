import LoginButton from './components/LoginButton';
import LoggedIn from './components/LoggedIn';
import LogoutButton from './components/LogoutButton';
import LoggedOut from './components/LoggedOut';
import { LinkSaver } from './components/LinkSaver';

export default function Home() {
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
