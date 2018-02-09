import React from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import GlyphInput from './GlyphInput';

export const RenderInput = ({ input, meta, placeholder, controlId, type, glyph, handleClick }) => (
    <FormGroup controlId={controlId} validationState={meta.error && meta.touched ? 'error' : null}>
        <GlyphInput input={input} handleClick={handleClick} placeholder={placeholder} type={type} glyph={glyph} />
        <FormControl.Feedback />
        {meta.error && meta.touched && <HelpBlock className='error-block'>{meta.error}</HelpBlock> }
    </FormGroup>
);
