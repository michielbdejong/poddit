import * as React from 'react';
import { Bookmark } from "../interfaces";

export interface Props {
  links: Bookmark[];
};

export const LinkList: React.FC<Props> = ({ links }) => {
  return (
    <ul>
      {links.sort(byNewer).map(linkToCard)}
    </ul>
  );
};

function byNewer(bookmarkA: Bookmark, bookmarkB: Bookmark): number {
  return bookmarkB.created.getTime() - bookmarkA.created.getTime();
}

function linkToCard(link: Bookmark, index: number): JSX.Element {
  return (
    <li key={index} className="card section">
      <p className="content is-large">
        <a href={link.url} title={`View ${link.title || link.url}`}>{link.title || link.url}</a>
      </p>
    </li>
  );
}
