import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from '../components/home/HomePage';
import AuthPage from '../components/users/AuthPage';
import RegisterForm from '../components/users/RegisterForm';
import LoginForm from '../components/users/LoginForm';
import ProfilePage from '../components/users/Profile/ProfilePage';


const Router = () => (
    <main>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/users/profile' component={ProfilePage} />
            <AuthPage>
                <Route path='/users/login' component={LoginForm} />
                <Route path='/users/register' component={RegisterForm} />
            </AuthPage>
        </Switch>
    </main>
);

export default Router;
