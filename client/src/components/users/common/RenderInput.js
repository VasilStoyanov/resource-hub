import React from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

export const RenderInput = ({ input, meta, placeholder, type }) => (
    <FormGroup controlId="auth-form-group" validationState={meta.error && meta.touched ? 'error' : null}>
        <FormControl {...input} placeholder={placeholder} type={type || 'text'} />
        <FormControl.Feedback />
        {meta.error && meta.touched && <HelpBlock>{meta.error}</HelpBlock> }
    </FormGroup>
);
