import React from 'react';
import { FormControl, Glyphicon, InputGroup } from 'react-bootstrap';

const GlyphInput = ({ input, placeholder, type, glyph, handleClick }) => (
    <InputGroup>
        <InputGroup.Addon onClick={handleClick}>
            <Glyphicon glyph={glyph} />
        </InputGroup.Addon>
        <FormControl {...input} placeholder={placeholder} type={type || 'text'} />
   </InputGroup>
    );

export default GlyphInput;
