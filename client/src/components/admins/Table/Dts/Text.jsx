import React from 'react';

const Text = className => text => (
  <div className={className}>
    {(text !== undefined && text !== null) ? text.toString() : ''}
  </div>
);

export default Text;

