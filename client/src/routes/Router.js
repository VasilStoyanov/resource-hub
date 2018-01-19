import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from '../components/home/HomePage';
import AuthPage from '../components/users/AuthPage';
import RegisterForm from '../components/users/RegisterForm';
import LoginForm from '../components/users/LoginForm';
import ResourcesManagementPage from '../components/management/ResourcesManagementPage';


const Router = () => (
    <main>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/resources/manage' component={ResourcesManagementPage} />
            <AuthPage>
                <Route path='/users/login' component={LoginForm} />
                <Route path='/users/register' component={RegisterForm} />
            </AuthPage>
        </Switch>
    </main>
);

export default Router;
