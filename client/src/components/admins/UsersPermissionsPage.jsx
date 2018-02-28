import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { getUsers, changeSuggestedUsername } from '../../actions/users/index';
import UsersPermissionsTable from './UsersPermissionsTable';
import MUsersPermissionsTable from './MUsersPermissionsTable';
import { swapUsersRole } from '../../actions/roles';
import Pagination from '../common/Pagination';
import { ROWS_PER_PAGE } from '../../constants/UsersConstants';
import TextInput from '../common/TextInput';

class UsersPermissionsPage extends Component {
  componentDidMount() {
    this.switchPage(this.props.currentPage);
  }

  switchPage(page) {
    this.props.getUsers({
      suggestedUsername: this.props.suggestedUsername,
      from: ROWS_PER_PAGE * page,
      to: ROWS_PER_PAGE * (page + 1),
    });
  }

  changeSuggestedUsername(e) {
    this.props.changeSuggestedUsername({
      suggestedUsername: e.target.value,
      from: ROWS_PER_PAGE * this.props.currentPage,
      to: ROWS_PER_PAGE * (this.props.currentPage + 1),
    });
  }

  render() {
    const pagesCount = Math.round(Number(this.props.totalCount / ROWS_PER_PAGE));

    return (
      <Grid fluid>
        <Row style={{ zIndex: 1, width: '100%', position: 'fixed' }}>
          <Col lg={3} lgOffset={1} xs={12}>
            <TextInput
              value={this.props.suggestedUsername}
              handleChange={this.changeSuggestedUsername.bind(this)}
              placeholder="Search by username..."
            />
          </Col>
        </Row>
        <Row className="visible-lg visible-md visible-sm" style={{ paddingTop: '90px', paddingBottom: '80px' }}>
          <Col lg={10} lgOffset={1} xs={12}>
            <UsersPermissionsTable
              id="users-permissions-table"
              items={this.props.users}
              swapUsersRole={{
                supervisor: this.props.swapUsersRole('Supervisor'),
                admin: this.props.swapUsersRole('Admin'),
                moderator: this.props.swapUsersRole('Moderator'),
              }}
              userGroups={['Supervisor', 'Admin', 'Moderator']}
            />
          </Col>
        </Row>
        <Row className="visible-xs" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
          <Col lg={10} lgOffset={1} xs={12}>
            <MUsersPermissionsTable
              items={this.props.users}
              swapUsersRole={{
                supervisor: this.props.swapUsersRole('Supervisor'),
                admin: this.props.swapUsersRole('Admin'),
                moderator: this.props.swapUsersRole('Moderator'),
              }}
              userGroups={['Supervisor', 'Admin', 'Moderator']}
              id="m-users-permissions-table"
            />
          </Col>
        </Row>
        <div className="footer">
          <Col lg={3} lgOffset={4} xs={12}>
            <Pagination
              pagesCount={pagesCount}
              switchPage={page => this.switchPage(page)}
              pageNumber={this.props.currentPage}
              delta={1}
            />
          </Col>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users,
  suggestedUsername: state.usersReducer.suggestedUsername,
  currentPage: state.usersReducer.currentPage,
  totalCount: state.usersReducer.totalCount,
});

const mapDispatchToProps = dispatch => ({
  getUsers: ({ from, to, suggestedUsername }) =>
    dispatch(getUsers({ from, to, suggestedUsername })),
  swapUsersRole: role => userId => prevRoleState =>
    dispatch(swapUsersRole(role)(userId)(prevRoleState)),
  changeSuggestedUsername: ({ suggestedUsername, from, to }) =>
    dispatch(changeSuggestedUsername({ from, to, suggestedUsername })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPermissionsPage);
