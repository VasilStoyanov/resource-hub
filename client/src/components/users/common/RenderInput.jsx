import React from 'react';
import { FormGroup, FormControl, HelpBlock, Glyphicon, InputGroup } from 'react-bootstrap';

export const RenderInput = ({
  input, meta, placeholder, type, glyph, id = 'auth-form-group',
}) => (
  <FormGroup controlId={id} validationState={meta.error && meta.touched ? 'error' : null}>
    <InputGroup>
      <InputGroup.Addon>
        <Glyphicon glyph={glyph} />
      </InputGroup.Addon>
      <FormControl {...input} placeholder={placeholder} type={type || 'text'} />
    </InputGroup>
    <FormControl.Feedback />
    {meta.error && meta.touched && <HelpBlock className="error-block">{meta.error}</HelpBlock> }
  </FormGroup>
);
