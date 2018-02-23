import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import RequestsTable from './RequestsTable';
import Pagination from '../../common/Pagination';
import { getTopicRequests, confirmRequestAction } from '../../../actions/topics';
import { showDialog } from '../../../actions/dialog';
import { switchPage, paginationSearch, selectStatus } from '../../../actions/pagination';
import RequestsFiltration from './RequestsFiltration';
import ConfirmationDialog from '../../common/ConfirmationDialog';

class RequestsPage extends Component {
  componentWillMount() {
    if (!this.props.resources) {
      this.props.dispatch(getTopicRequests());
    }
  }

  handleSwitchPage(pageNumber) {
    if (pageNumber >= this.props.pagesCount || pageNumber < 0) {
      return;
    }
    this.props.dispatch(switchPage({ name: 'requests', pageNumber }));
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

  handleAction(e, request, type) {
    this.props.dispatch(showDialog({ show: true, item: request, type }));
  }

  handleConfirmation() {
    const data = { id: this.props.selectedRequest.id };
    const { actionType } = this.props;

    this.props.dispatch(showDialog({ show: false }));
    this.props.dispatch(confirmRequestAction({ data, actionType }));
  }

  handleActionCancelation() {
    this.props.dispatch(showDialog({ show: false }));
  }

  render() {
    const {
      pagesCount,
      pageNumber,
      paginationDelta,
      selectedRequests,
      selectedRequest: { topic },
      actionType,
      show } = this.props;

    return (
      <Grid fluid className="requests-page">
        {show &&
        <ConfirmationDialog
          text={`Are you sure you want to ${actionType} topic: ${topic}?`}
          handleYes={this.handleConfirmation.bind(this)}
          handleNo={this.handleActionCancelation.bind(this)}
        /> }
        <Row>
          <RequestsFiltration
            handleSearch={this.handleSearch.bind(this)}
            handleStatusChange={this.handleStatusChange.bind(this)}
          />
        </Row>
        <Row>
          <Col lg={10} lgOffset={1}>
            <RequestsTable
              {...this.props}
              requests={selectedRequests}
              handleAction={this.handleAction.bind(this)}
            />
            {pagesCount && pagesCount > 1 &&
            <Pagination
              pagesCount={pagesCount}
              switchPage={this.handleSwitchPage.bind(this)}
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
  selectedStatus: state.paginationReducer.requests.selectedStatus,
  show: state.dialogsReducer.show,
  selectedRequest: state.dialogsReducer.item,
  actionType: state.dialogsReducer.type,
});

export default connect(mapStateToProps)(RequestsPage);
