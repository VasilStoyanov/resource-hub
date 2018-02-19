import React, { Component } from 'react';
import { connect } from 'react-redux';
import RenderProfilePage from './RenderProfilePage';

export class ProfilePage extends Component {
  render() {
    return (
      <div>
        <RenderProfilePage
          handleChangeEmail={this.props.changeEmail}
          username={this.props.username}
          email={this.props.email}
          changepassurl="/users/profile/changepassword"
          changeemailurl="/users/profile/changeemail"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.authReducer.currentUser.username,
  email: state.authReducer.currentUser.email,
});

export default connect(mapStateToProps)(ProfilePage);

