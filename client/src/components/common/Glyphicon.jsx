import React from 'react';
import { InputGroup, Glyphicon as DefaultGlyphicon } from 'react-bootstrap';

const Glyphicon = ({ handleClick, glyph, className }) => (
  <InputGroup.Addon onClick={handleClick} className={className}>
    <DefaultGlyphicon glyph={glyph} />
  </InputGroup.Addon>
);

export default Glyphicon;
