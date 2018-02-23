import React from 'react';
import { Table } from 'react-bootstrap';
import RequestsActions from './RequestsActions';

export default ({ requests, history, selectedStatus, handleAction }) => {
  const requestRows = requests.map((request) => {
    const { id, topic, username, creationDate } = request;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{topic}</td>
        <td>{username}</td>
        <td>{creationDate}</td>
        <RequestsActions
          request={request}
          selectedStatus={selectedStatus}
          handleAction={handleAction}
          history={history}
        />
      </tr>
    );
  });
  return (
    <Table responsive striped bordered hover condensed>
      <thead className="basic-thead">
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
