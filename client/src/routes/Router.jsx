import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from '../components/home/HomePage';
import AuthPage from '../components/users/AuthPage';
import RegisterForm from '../components/users/RegisterForm';
import LoginForm from '../components/users/LoginForm';
import ProfilePageC from '../components/users/Profile/ProfilePage';
import ChangeEmail from '../components/users/Profile/ChangeEmail';
import ChangePassword from '../components/users/Profile/ChangePassword';


const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/users/profile" component={ProfilePageC} />
      <Route exact path="/users/profile/changeemail" component={ChangeEmail} />
      <Route exact path="/users/profile/changepassword" component={ChangePassword} />
      <AuthPage>
        <Route path="/users/login" component={LoginForm} />
        <Route path="/users/register" component={RegisterForm} />
      </AuthPage>
    </Switch>
  </main>
);

export default Router;
