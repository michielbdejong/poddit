import * as React from 'react';
import { Bookmark } from "@solid-data-modules/bookmarks-rdflib";

export interface Props {
  links: Bookmark[];
};

export const LinkList: React.FC<Props> = ({ links }) => {
  return (
    <ul>
      {links.map(linkToCard)}
    </ul>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function linkToCard(link: Bookmark, index: number): any {
  return (
    <li key={index} className="card section">
      <p className="content is-large">
        <a href={link.uri} title={`View ${link.title || link.uri}`}>{link.title || link.uri}</a>
      </p>
    </li>
  );
}
