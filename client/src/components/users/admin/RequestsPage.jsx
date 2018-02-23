import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import RequestsTable from './RequestsTable';
import Pagination from '../../common/Pagination';
import { getTopicRequests } from '../../../actions/topics';
import { switchPage, paginationSearch, selectStatus } from '../../../actions/pagination';
import RequestsFiltration from './RequestsFiltration';

class RequestsPage extends Component {
  componentWillMount() {
    if (!this.props.resources) {
      this.props.dispatch(getTopicRequests());
    }
  }

  handleSearch(e) {
    this.props.dispatch(paginationSearch({
      name: 'requests',
      filterBy: 'topic',
      query: e.target.value }));
  }

  handleStatusChange(e) {
    this.props.dispatch(selectStatus({
      name: 'requests',
      status: +e.target.value }));
  }

  render() {
    const { pagesCount, pageNumber, paginationDelta, selectedRequests } = this.props;

    return (
      <Grid fluid className="pending-requests-page">
        <Row>
          <Col>
            <h1 className="basic-header">Topics Requests</h1>
          </Col>
          <RequestsFiltration
            handleSearch={this.handleSearch.bind(this)}
            handleStatusChange={this.handleStatusChange.bind(this)}
          />
        </Row>
        <Row>
          <Col lg={10} lgOffset={1}>
            <RequestsTable {...this.props} requests={selectedRequests} />
            {pagesCount && pagesCount > 1 &&
            <Pagination
              pagesCount={pagesCount}
              switchPage={switchPage}
              itemsName="requests"
              pageNumber={pageNumber}
              delta={paginationDelta}
            />}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  selectedRequests: state.paginationReducer.requests.selected,
  requests: state.requestsReducer.requests,
  pageNumber: state.paginationReducer.requests.pageNumber,
  pagesCount: state.paginationReducer.requests.pagesCount,
  paginationDelta: state.paginationReducer.requests.paginationDelta,
});

export default connect(mapStateToProps)(RequestsPage);
