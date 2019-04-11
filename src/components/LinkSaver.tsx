import * as React from 'react';
import { Value, useWebId, useLDflexValue, List, Like, useLDflexList } from '@solid/react';
import data from '@solid/query-ldflex';
import { LinkList } from './LinkList';

export const LinkSaver: React.FC = () => {
  const webId = useWebId();
  const name = useLDflexValue(`[${webId}].name`);
  const interests = useLDflexList(`[${webId}].interest`).map(interest => interest.toString());
  const [link, setLink] = React.useState<string>();

  async function saveLink(event: React.FormEvent) {
    event.preventDefault();

    if (!webId) {
      return;
    }
    await data.user.interest.add(link);
  }

  const title = (name) ? `${name.toString()}'s links` : 'Your links';

  return (
    <>
      <header className="hero is-info">
        <div className="hero-body">
          <p className="container">
            <h2 className="title">{title}</h2>
          </p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <form onSubmit={saveLink} className="field has-addons is-horizontal is-large">
            <label htmlFor="shareLink" className="is-sr-only">
              Add a link
            </label>
            <div className="field-body">
              <div className="control">
                <input
                  id="shareLink"
                  className="input is-large"
                  type="url"
                  placeholder="e.g. `https://solid.community`"
                  onChange={(event) => setLink(event.target.value)}
                />
              </div>
              <div className="control">
                <input type="submit" className="button is-large is-primary" value="Add"/>
              </div>
            </div>
          </form>
          <LinkList links={interests}/>
        </div>
      </section>
    </>
  );
};
