import React from 'react';
import Row from './Row';

const Table = ({
  columnNames, items, rowSchema, classNameTbl, classNameRow, onClickedRowHandler, id,
}) => {
  let index = 0;

  const thead = columnNames.map(name => (
    <th key={name}> {name} </th>));

  const tbody = items.map((item) => {
    index += 1;

    return (
      <tr key={index} className={classNameRow} onClick={onClickedRowHandler}>
        <Row data={item} rowSchema={rowSchema} />
      </tr>
    );
  });

  return (
    <table className={classNameTbl} id={id}>
      <thead>
        <tr>
          {thead}
        </tr>
      </thead>
      <tbody>
        {tbody}
      </tbody>
    </table>
  );
};

export default Table;
