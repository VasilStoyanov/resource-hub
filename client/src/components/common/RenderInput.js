import React from 'react';
import { FormGroup, FormControl, InputGroup, ControlLabel, Glyphicon, HelpBlock } from 'react-bootstrap';

export const RenderInput = ({input, meta, controlId, glyph, handleClick, options, placeholder, type, right, label, disabled}) => {
    const control =  !options 
                    ? (<FormControl {...input} placeholder={placeholder} type={type || 'text'} disabled={disabled} />)
                    :(
                    <FormControl componentClass="select" placeholder="select">
                        {options.map((option, index) => {
                            const {value, displayValue, selected} = option;
                            return (<option key={index} value={value} selected={selected}>{displayValue || value}</option>);
                        })}
                    </FormControl>
                    );

    const render = glyph 
                 ? (
                    <InputGroup>
                        {right && control }
                        <InputGroup.Addon onClick={handleClick}>
                            <Glyphicon glyph={glyph} />
                        </InputGroup.Addon>
                        {!right && control }
                    </InputGroup>) 
                : (control);

    const  {error, touched} = meta || {};

    return (
        <FormGroup controlId={controlId} validationState={error && touched ? 'error' : null}>
            {label && <ControlLabel>{label}</ControlLabel>}
            {render}  
            {error && touched && <HelpBlock className='error-block'>{error}</HelpBlock> }
        </FormGroup>
    );
}
