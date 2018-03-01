import React from 'react';

const Row = ({ data, rowSchema }) => {
  let index = 0;

  const tds = rowSchema
    .map((item) => {
      index += 1;

      return data[item.propName] !== undefined ?
        (<td key={index}>
          {item.renderFunction(data[item.propName])}
        </td>) :
        (<td key={index}>
          none
        </td>);
    });

  return tds;
};

export default Row;
