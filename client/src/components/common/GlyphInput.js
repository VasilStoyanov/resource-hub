import React from 'react';
import { FormControl, Glyphicon, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
  
const createTooltip = (message) => (
    <Tooltip id="tooltip">
      <strong>{message}</strong>
    </Tooltip>
  );

const GlyphInput = ({ input, placeholder, type, glyph, handleClick, tooltip }) => (
    <InputGroup>
        <InputGroup.Addon onClick={handleClick}>
            {tooltip && 
            <OverlayTrigger placement="left" overlay={createTooltip(tooltip)}>
                <Glyphicon glyph={glyph} />
            </OverlayTrigger>}
            {!tooltip && <Glyphicon glyph={glyph} /> }
        </InputGroup.Addon>
        <FormControl {...input} placeholder={placeholder} type={type || 'text'} />
   </InputGroup>
    );

export default GlyphInput;
