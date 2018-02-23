import React from 'react';
import Glyphicon from '../../common/Glyphicon';

const RequestsActions = ({ selectedStatus, handleAction, request }) => (
  <td>
    {selectedStatus !== 1 && <Glyphicon
      glyph="ok"
      className="glyph-btn glyph-icon-btn-green"
      tooltipText="approve"
      handleClick={e => handleAction(e, request, 'approve')}
    />}
    {selectedStatus !== 3 && <Glyphicon
      glyph="remove"
      className="glyph-btn glyph-icon-btn-red"
      tooltipText="dissaprove"
      handleClick={e => handleAction(e, request, 'dissaprove')}
    />}
    <Glyphicon
      glyph="trash"
      className="glyph-btn glyph-icon-btn-red"
      tooltipText="delete"
      handleClick={e => handleAction(e, request, 'delete')}
    />
    <Glyphicon
      glyph="zoom-in"
      className="glyph-btn glyph-icon-btn-orange"
      tooltipText="details"
      handleClick={e => handleAction(e, request, 'details')}
    />
  </td>
);

export default RequestsActions;
