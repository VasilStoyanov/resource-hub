import React from 'react';
import { Table } from 'react-bootstrap';
import RequestsActions from './RequestsActions';

export default ({ requests, history }) => {
  const requestRows = requests.map((request) => {
    const { id, topic, username, creationDate } = request;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{topic}</td>
        <td>{username}</td>
        <td>{creationDate}</td>
        <RequestsActions id={id} history={history} />
      </tr>
    );
  });
  return (
    <Table responsive striped bordered hover condensed>
      <thead>
        <tr>
          <th>Id</th>
          <th>Topic</th>
          <th>Submitted by</th>
          <th>Creation Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requestRows}
      </tbody>
    </Table>
  );
};
