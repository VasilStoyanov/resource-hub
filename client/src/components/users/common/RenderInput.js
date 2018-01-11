import React from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import { GlyphInput } from '../../common/GlyphInput';

export const RenderInput = ({ input, name, meta, placeholder, type, glyph }) => (
    <FormGroup controlId="auth-form-group" validationState={meta.error && meta.touched ? 'error' : null}>
            <GlyphInput {...input} name={name} placeholder={placeholder} type={type} glyph={glyph} />
            <FormControl.Feedback />
            {meta.error && meta.touched && <HelpBlock className='error-block'>{meta.error}</HelpBlock> }
    </FormGroup>
);
