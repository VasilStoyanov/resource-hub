import React from 'react';
import Glyphicon from '../../common/Glyphicon';

const RequestsActions = ({ handleApprove, handleDelete, id, history }) => (
  <td>
    <Glyphicon
      glyph="ok"
      className="glyph-btn glyph-btn-green"
      handleClick={handleApprove}
    />
    <Glyphicon
      glyph="trash"
      className="glyph-btn glyph-btn-red"
      handleClick={handleDelete}
    />
    <Glyphicon
      glyph="zoom-in"
      className="glyph-btn glyph-btn-orange"
      handleClick={() => history.push(`/resources/details/${id}`)}
    />
  </td>
);

export default RequestsActions;
