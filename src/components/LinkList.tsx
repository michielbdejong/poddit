import * as React from 'react';

export interface Props {
  links: string[];
};

export const LinkList: React.FC<Props> = ({ links }) => {
  return (
    <ul>
      {links.map(linkToCard)}
    </ul>
  );
};

function linkToCard(link: string, index: number): JSX.Element {
  return (
    <li key={index} className="card section">
      <p className="content is-large">
        <a href={link}>{link}</a>
      </p>
    </li>
  );
}
