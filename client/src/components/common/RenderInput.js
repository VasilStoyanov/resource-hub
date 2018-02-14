import React from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import GlyphInput from './GlyphInput';

export const RenderInput = ({ input, meta, value, initialValue, placeholder, controlId, type, glyph, handleClick, tooltip }) => (
    <FormGroup controlId={controlId} validationState={meta.error && meta.touched ? 'error' : null}>
        <GlyphInput input={input} handleClick={handleClick} placeholder={placeholder} type={type} glyph={glyph} tooltip={tooltip} />
        <FormControl.Feedback />
        {meta.error && meta.touched && <HelpBlock className='error-block'>{meta.error}</HelpBlock> }
    </FormGroup>
);
