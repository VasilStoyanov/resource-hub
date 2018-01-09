import React from 'react';

export const RenderInput = ({ input, meta, placeholder, type }) => (
    <div className='form-group'>
    {meta.error && meta.touched && <div className='alert alert-danger'>
        {meta.error}
    </div>}
        <input 
        {...input} placeholder={placeholder}
        className='form-control' 
        type={type || 'text'}
        /> 
    </div>
);
