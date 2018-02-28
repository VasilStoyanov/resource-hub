import React from 'react';
import { InputGroup, Glyphicon as DefaultGlyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

const tooltip = text => (
  <Tooltip id="tooltip">
    <strong>{text}</strong>
  </Tooltip>
);

const Glyphicon = ({ handleClick, glyph, className, tooltipText, tooltipPlacement }) => {
  const glyphicon = (
    <InputGroup.Addon onClick={handleClick} className={className}>
      <DefaultGlyphicon glyph={glyph} />
    </InputGroup.Addon>);

  return tooltipText
    ? (
      <OverlayTrigger placement={tooltipPlacement || 'left'} overlay={tooltip(tooltipText)}>
        {glyphicon}
      </OverlayTrigger>
    )
    : glyphicon;
};

export default Glyphicon;
