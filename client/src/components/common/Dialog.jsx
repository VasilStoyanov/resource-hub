import React from 'react';
import { Modal } from 'react-bootstrap';

export default ({ title, body, buttons }) => (
  <div className="static-modal">
    <Modal show>
      <Modal.Header>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      {body &&
        <Modal.Body>
          {body}
        </Modal.Body>}

      <Modal.Footer>
        {buttons}
      </Modal.Footer>
    </Modal>
  </div>
);
