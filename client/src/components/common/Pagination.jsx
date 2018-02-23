import React from 'react';
import { Pagination } from 'react-bootstrap';

const Pages = ({ pagesCount, pageNumber, delta, switchPage }) => {
  const items = [];
  const left = pageNumber <= delta ? 1 : pageNumber - delta;
  const right = pageNumber + delta + 1 >= pagesCount ? pagesCount - 2 : pageNumber + delta;
  let key = 0;

  items.push(<Pagination.Item
    key={key += 1}
    active={pageNumber === 0}
    onClick={() => switchPage(0)}
  >
    {1}
  </Pagination.Item>);

  if (right > 5) {
    items.push(<Pagination.Ellipsis
      key={key += 1}
      onClick={() => switchPage(pageNumber - 3)}
    />);
  }

  for (let i = left; i <= right; i += 1) {
    items.push(<Pagination.Item
      key={key += 1}
      active={pageNumber === i}
      onClick={() => switchPage(i)}
    >
      {i + 1}
    </Pagination.Item>);
  }

  if (right < pagesCount - 2) {
    items.push(<Pagination.Ellipsis
      key={key += 1}
      onClick={() => switchPage(pageNumber + 4)}
    />);
  }

  items.push(<Pagination.Item
    key={key += 1}
    onClick={() => switchPage(pagesCount - 1)}
  >
    {pagesCount}
  </Pagination.Item>);


  return (
    <Pagination>
      <Pagination.First onClick={() => switchPage(0)} />
      <Pagination.Prev onClick={() => switchPage(pageNumber - 1)} />
      {items}
      <Pagination.Next onClick={() => switchPage(pageNumber + 1)} />
      <Pagination.Last onClick={() => switchPage(pagesCount - 1)} />
    </Pagination>
  );
};

export default Pages;
