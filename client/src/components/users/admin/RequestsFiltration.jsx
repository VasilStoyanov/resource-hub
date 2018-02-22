import React from 'react';
import { Col } from 'react-bootstrap';
import { RenderInput } from '../../common/RenderInput';

export default ({ handleSearch, handleStatusChange }) => (<Col>
  <Col lg={2} lgOffset={1}>
    <RenderInput
      right
      glyph="search"
      placeholder="Search by topic..."
      handleChange={handleSearch}
    />
  </Col>
  <Col lg={2} lgOffset={6}>
    <RenderInput
      right
      glyph="stats"
      handleChange={handleStatusChange}
      options={[
          { value: 1, displayValue: 'Approved', selected: true },
          { value: 2, displayValue: 'Pending' },
          { value: 3, displayValue: 'Disapproved' }]}
    />
  </Col>
</Col>);
