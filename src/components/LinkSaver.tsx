import * as React from 'react';
import { useWebId, useLDflexValue } from '@solid/react';

import { LinkList } from './LinkList';
import { AS } from '../namespaces';
import { Page } from '../interfaces';
import { storePage } from '../store/storePage';
import { useStore } from '../hooks/useStore';
import { usePages } from '../hooks/usePages';

export const LinkSaver: React.FC = () => {
  const webId = useWebId();
  const name = useLDflexValue(`[${webId}].name`);
  const [link, setLink] = React.useState<string>();
  const [title, setTitle] = React.useState<string>();
  const [addedLocalPages, addLocalPage] = React.useReducer<React.Reducer<Page[], Page>>(
    (oldPages, page) => oldPages.concat(page),
    [],
  );
  const store = useStore();
  const pages = usePages(store);
  let links: Page[] = [];
  if (store && pages) {
    links = pages.map(page => {
      const url = store.any(page, AS('url'), undefined, undefined);
      const title = store.any(page, AS('name'), undefined, undefined);
      return {
        url: url.value,
        title: (title) ? title.value : url.value,
      };
    });
  }

  async function saveLink(event: React.FormEvent) {
    event.preventDefault();

    if (!store || !webId || !link || !title) {
      return;
    }
    const newPage: Page = {
      url: link,
      title: title,
    };
    // Eagerly add the link to the local list so it already shows up in the UI:
    addLocalPage(newPage);
    await storePage(store, webId, newPage);
  }

  const heading = (name) ? `${name.toString()}'s links` : 'Your links';

  return (
    <>
      <header className="hero is-info">
        <div className="hero-body">
          <p className="container">
            <h2 className="title">{heading}</h2>
          </p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <form onSubmit={saveLink} className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <label htmlFor="shareLink" className="label">
                  URL
                </label>
                <div className="control">
                  <input
                    id="shareLink"
                    required={true}
                    className="input is-large"
                    type="url"
                    placeholder="e.g. `https://solid.community`"
                    onChange={(event) => setLink(event.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="shareTitle" className="label">
                  Title
                </label>
                <div className="control">
                  <input
                    id="shareTitle"
                    required={true}
                    className="input is-large"
                    type="text"
                    placeholder="e.g. `Solid prototype server`"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
              </div>
              <div className="control pageSubmit">
                <input type="submit" className="button is-large is-primary" value="Add link"/>
              </div>
            </div>
          </form>
          <LinkList links={addedLocalPages.concat(links)}/>
        </div>
      </section>
    </>
  );
};
