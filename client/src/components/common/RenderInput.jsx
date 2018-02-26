import React from 'react';
import { FormGroup, FormControl, InputGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import Glyphicon from './Glyphicon';

export const RenderInput = ({
  input,
  meta,
  controlId,
  glyph,
  glyphClass,
  handleClick,
  handleChange,
  options,
  placeholder,
  type,
  right,
  label,
  disabled,
}) => {
  const control = !options
    ? (<FormControl
      {...input}
      onChange={(e) => {
          input.onChange(e);
          if (handleChange) {
            handleChange(e);
          }
        }}
      placeholder={placeholder}
      type={type || 'text'}
      disabled={disabled}
    />)
    : (
      <FormControl componentClass="select" placeholder="select" onChange={handleChange}>
        {options.map((option, index) => {
                            const { value, displayValue, selected } = option;
                            return (<option
                              key={index}
                              value={value}
                              selected={selected}
                            >{displayValue || value}</option>);
                            })}
      </FormControl>
    );

  const render = glyph
    ? (
      <InputGroup>
        {right && control }
        <Glyphicon glyph={glyph} handleClick={handleClick} className={glyphClass} />
        {!right && control }
      </InputGroup>)
    : (control);

  const { error, touched } = meta || {};

  return (
    <FormGroup controlId={controlId} validationState={error && touched ? 'error' : null}>
      {label && <ControlLabel>{label}</ControlLabel>}
      {render}
      {error && touched && <HelpBlock className="error-block">{error}</HelpBlock> }
    </FormGroup>
  );
};
