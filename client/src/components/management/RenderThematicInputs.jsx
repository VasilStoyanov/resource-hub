import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, Glyphicon, Row, Col } from 'react-bootstrap';
import { RenderInput } from '../common/RenderInput';

class RenderThematicsInput extends Component {
  componentDidMount() {
    this.props.fields.push();
  }

  addThematic() {
    if (this.props.valid) {
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
        <Row>
          <Col lg={1} className="remove-thematic-button-col">
            <Button
              type="button"
              className="basic-button btn-sm"
              onClick={this.removeThematic.bind(this, index)}
            >
              <Glyphicon glyph="remove" />
            </Button>
          </Col>
          <Col lg={5}>
            <Field
              name={`${thematic}.name`}
              type="text"
              component={RenderInput}
              glyph="font"
              placeholder={`thematic #${index + 1}`}
            />
          </Col>
          <Col lg={5}>
            <Field
              name={`${thematic}.image`}
              type="text"
              glyph="picture"
              component={RenderInput}
              placeholder="Image Url"
            />
          </Col>
          {index === this.props.fields.length - 1 &&
          <Col lg={1}>
            <Button
              type="button"
              className="basic-button btn-sm"
              onClick={this.addThematic.bind(this)}
            >
              <Glyphicon glyph="plus" />
            </Button>
          </Col>}
        </Row>
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
