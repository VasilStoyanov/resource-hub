import React from 'react';
import { Col } from 'react-bootstrap';
import { RenderInput } from '../../common/RenderInput';

export default ({ handleSearch, handleStatusChange }) => (<Col>
  <Col lg={2} lgOffset={1}>
    <RenderInput
      right
      glyph="search"
      glyphClass="glyph-btn-light-purple"
      label="Search"
      placeholder="Search by topic..."
      handleChange={handleSearch}
    />
  </Col>
  <Col lg={2} lgOffset={6}>
    <RenderInput
      right
      glyph="stats"
      glyphClass="glyph-btn-light-purple"
      label="Status Filter"
      handleChange={handleStatusChange}
      options={[
          { value: 1, displayValue: 'Approved' },
          { value: 2, displayValue: 'Pending', selected: true },
          { value: 3, displayValue: 'Disapproved' }]}
    />
  </Col>
</Col>);
