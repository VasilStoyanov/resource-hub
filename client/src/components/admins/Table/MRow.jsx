import React from 'react';

const MRow = ({
  keya, data, rowSchema, columnNames, className,
}) => {
  let index = 0;

  if (!data) { return (<div />); }

  const tds = rowSchema
    .map((item) => {
      index += 1;

      return data[item.propName] !== undefined ? (
        <div key={index}>
          <strong>
            {columnNames[(index % (columnNames.length + 1)) - 1]}:
          </strong>
          <div>
            {item.renderFunction(data[item.propName])}
          </div>
          <hr />
        </div>) :
        (<div key={index}>
          {columnNames[(index % columnNames.length) - 1]}: none
        </div>);
    });

  return (
    <div key={keya} className={className}>
      {tds}
    </div>);
};

export default MRow;
