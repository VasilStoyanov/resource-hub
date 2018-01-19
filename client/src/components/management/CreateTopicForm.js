import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class CreateTopicForm extends Component {
  render() {
    return (
        <div>    
            <Field name='name' placeholder='Topic name' component='input' />
            <Field name='thematic' placeholder='Thematic name' component='input' />
        </div>
    );
  }
}

export default reduxForm({ form: 'create-topic-form' })(CreateTopicForm);
