import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import RenderThematicInputs from './RenderThematicInputs';
import Glyphicon from '../common/GlyphInput';

class CreateTopicForm extends Component {
  constructor() {
    super();

    this.state = {
      thematicInputs: [{}]
    };
  }

  submit(result) {
    console.log(result);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
        <form onSubmit={handleSubmit(this.submit.bind(this))}>    
            <Field name='name' placeholder='Topic name' glyph='asterisk' component={Glyphicon} />
            <FieldArray name='randArr' component={RenderThematicInputs} />
            <button type='submit'>Add Topic</button>
        </form>
    );
  }
}

export default reduxForm({ form: 'create-topic-form' })(CreateTopicForm);
