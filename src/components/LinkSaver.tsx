import * as React from 'react';
import { Value, useWebId, useLDflexValue, List, Like } from '@solid/react';
import data from '@solid/query-ldflex';

export const LinkSaver: React.FC = () => {
  const webId = useWebId();
  const [link, setLink] = React.useState<string>();

  async function saveLink(event: React.FormEvent) {
    event.preventDefault();

    if (!webId) {
      return;
    }
    await data.user.interest.add(link);
  }

  return (
    <>
      <form onSubmit={saveLink}>
        <label>
          Add a link
          <input type="url" onChange={(event) => setLink(event.target.value)}/>
        </label>
        <input type="submit" value="Add"/>
      </form>
      <List src={`[${webId}].interest`}/>
    </>
  );
};
