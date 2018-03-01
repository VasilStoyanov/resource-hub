import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from '../components/home/HomePage';
import AuthPage from '../components/users/authentication/AuthPage';
import RegisterForm from '../components/users/authentication/RegisterForm';
import LoginForm from '../components/users/authentication/LoginForm';
import ResourcesManagementPage from '../components/management/ResourcesManagementPage';
import ChangePassword from '../components/users/Profile/ChangePassword';
import ChangeEmail from '../components/users/Profile/ChangeEmail';
import ProfilePage from '../components/users/Profile/ProfilePage';
import UsersPermissionsPage from '../components/admins/UsersPermissionsPage';
import RequestsPage from '../components/users/admin/RequestsPage';


const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/users" component={UsersPermissionsPage} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/resources/manage" component={ResourcesManagementPage} />
      <Route exact path="/users/profile" component={ProfilePage} />
      <Route exact path="/users/profile/changeemail" component={ChangeEmail} />
      <Route exact path="/users/profile/changepassword" component={ChangePassword} />
      <Route exact path="/users/admin/pendingrequests" component={RequestsPage} />
      <AuthPage>
        <Route path="/users/login" component={LoginForm} />
        <Route path="/users/register" component={RegisterForm} />
      </AuthPage>
    </Switch>
  </main>
);

export default Router;
