'use client'

import * as React from 'react';
import { useWebId } from '../hooks/useWebId';
import { useLDflexValue } from '../hooks/useLDflexValue';

import { LinkList } from './LinkList';
import { DC, BOOKMARK } from '../namespaces';
import { Bookmark } from '../interfaces';
import { storeBookmark } from '../store/storeBookmark';
import { useStore } from '../hooks/useStore';
import { useBookmarks } from '../hooks/useBookmarks';

export const LinkSaver: React.FC = () => {
  const webId = useWebId();
  const name = useLDflexValue(`[${webId}].name`);
  const [link, setLink] = React.useState<string>();
  const [title, setTitle] = React.useState<string>();
  const [addedLocalBookmarks, addLocalBookmark] = React.useReducer<React.Reducer<Bookmark[], Bookmark>>(
    (oldBookmarks, bookmark) => oldBookmarks.concat(bookmark),
    [],
  );
  const store = useStore();
  const bookmarks = useBookmarks(store);
  let links: Bookmark[] = [];
  if (store && bookmarks) {
    links = bookmarks.map(bookmark => {
      const url = store.any(bookmark, BOOKMARK('recalls'), undefined, undefined);
      const title = store.any(bookmark, DC('title'), undefined, undefined);
      const created = store.any(bookmark, DC('created'), undefined, undefined);
      return {
        url: url.value,
        title: (title) ? title.value : url.value,
        created: (created) ? new Date(created.value) : new Date(0),
      };
    });
  }

  async function saveLink(event: React.FormEvent) {
    event.preventDefault();

    if (!store || !webId || !link || !title) {
      return;
    }
    const newBookmark: Bookmark = {
      url: link,
      title: title,
      created: new Date(),
    };
    // Eagerly add the link to the local list so it already shows up in the UI:
    addLocalBookmark(newBookmark);
    await storeBookmark(store, webId, newBookmark);
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
          <LinkList links={addedLocalBookmarks.concat(links)}/>
        </div>
      </section>
    </>
  );
};
