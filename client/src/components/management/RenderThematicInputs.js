import React from 'react';
import { Field } from 'redux-form';
import GlyphInput from '../common/GlyphInput';

const RenderThematicInputs = ({ fields, meta: { error } }) => (
      <ul>
            <li>
            <button type="button" onClick={() => fields.push()}>Add Thematic</button>
            </li>
            {fields.map((thematic, index) =>
            (<li key={index}>
                <Field
                    name={thematic}
                    type="text"
                    component={GlyphInput}
                    handleClick={() => fields.remove(index)} 
                    glyph='remove'
                    placeholder={`thematic #${index + 1}`} 
                />
            </li>)
            )}
            {error && <li className="error">{error}</li>}
     </ul>
  );

  export default RenderThematicInputs;
