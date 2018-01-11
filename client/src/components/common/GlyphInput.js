import React from 'react';
import { FormControl, Glyphicon, InputGroup } from 'react-bootstrap';

export const GlyphInput = ({ input, placeholder, type, glyph, placeRight = false }) => (
    <InputGroup>
    {placeRight && <FormControl {...input} placeholder={placeholder} type={type || 'text'} /> }
        <InputGroup.Addon>
            <Glyphicon glyph={glyph} />
        </InputGroup.Addon>
    {!placeRight && <FormControl {...input} placeholder={placeholder} type={type || 'text'} /> }
    </InputGroup>
);
