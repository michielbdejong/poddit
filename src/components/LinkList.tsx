import * as React from 'react';
import { Page } from "../interfaces";

export interface Props {
  links: Page[];
};

export const LinkList: React.FC<Props> = ({ links }) => {
  return (
    <ul>
      {links.map(linkToCard)}
    </ul>
  );
};

function linkToCard(link: Page, index: number): JSX.Element {
  return (
    <li key={index} className="card section">
      <p className="content is-large">
        <a href={link.url} title={`View ${link.title || link.url}`}>{link.title || link.url}</a>
      </p>
    </li>
  );
}
