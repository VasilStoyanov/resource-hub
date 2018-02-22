import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, Glyphicon } from 'react-bootstrap';
import { RenderInput } from '../common/RenderInput';

class RenderThematicsInput extends Component {
  componentDidMount() {
    this.props.fields.push();
  }

  addThematic() {
    if (this.props.valid &&
        !this.props.fields.getAll().some(n => !n || !n.thematic || n.thematic.length < 0)) {
      this.props.fields.push();
    }
  }

  removeThematic(index) {
    if (this.props.fields.length > 1) {
      this.props.fields.remove(index);
    }
  }

  render() {
    const inputs = this.props.fields.map((thematic, index) =>
      (<li key={index}>
        <div className="row">
          <div className="col-lg-1">
            <Button
              type="button"
              className="basic-button btn-sm"
              onClick={this.addThematic.bind(this)}
            >
              <Glyphicon glyph="remove" />
            </Button>
          </div>
          <div className="col-lg-5">
            <Field
              name={`${thematic}.thematic`}
              type="text"
              component={RenderInput}
              handleClick={this.removeThematic.bind(this, index)}
              glyph="font"
              placeholder={`thematic #${index + 1}`}
            />
          </div>
          <div className="col-lg-5">
            <Field
              name={`${thematic}.thematic`}
              type="text"
              glyph="picture"
              component={RenderInput}
              placeholder={`thematic #${index + 1}`}
            />
          </div>
          {index === this.props.fields.length - 1 &&
          <Button
            type="button"
            className="basic-button btn-sm"
            onClick={this.addThematic.bind(this)}
          >
            <Glyphicon glyph="plus" />
          </Button>
                    }
        </div>
      </li>
      ));

    return (
      <ul>
        {inputs}
      </ul>
    );
  }
}

export default RenderThematicsInput;
