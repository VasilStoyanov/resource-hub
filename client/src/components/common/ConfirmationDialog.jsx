import React from 'react';
import { Button } from 'react-bootstrap';
import Dialog from './Dialog';

export default ({ handleYes, handleNo, text }) => (
  <Dialog
    title={text}
    buttons={(
      <div>
        <Button className=" btn basic-button basic-button-lg" onClick={handleYes}>Yes</Button>
        <Button className="btn basic-button basic-button-lg" onClick={handleNo}>No</Button>
      </div>)}
  />
);
