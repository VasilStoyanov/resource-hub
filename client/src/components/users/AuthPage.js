import React, { Component } from 'react';
import AuthNavbar from './AuthNavbar';

class AuthPage extends Component {
    render() {
        return (
            <div>
               <div>
                    <div className="container auth-page-container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <div className="panel panel-login">
                                    <div className="panel-heading">
                                        <AuthNavbar location={this.props.location} />
                                        <hr /></div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                 {this.props.children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthPage;
