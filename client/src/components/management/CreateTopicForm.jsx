/* eslint-disable */

import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import RenderThematicInputs from './RenderThematicInputs';
import { RenderInput } from '../common/RenderInput';
import { Button, Glyphicon } from 'react-bootstrap';
import { validate } from '../../utilities/validators/validationSchemas/topicCreationValidator';

class CreateTopicForm extends Component {
  submit(result) {
    console.log(result);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="basic-form-input" onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field
          name="topic"
          placeholder="Topic name"
          glyph="asterisk"
          component={RenderInput}
        />
        <FieldArray
          name="thematics"
          valid={this.props.valid}
          component={RenderThematicInputs}
        />

        <div className="add-topic-button-container">
          <Button type="submit" className="basic-button">Add</Button>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: 'create-topic-form', validate })(CreateTopicForm);
