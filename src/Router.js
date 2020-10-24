import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import compoents

import LoginContainer from './components/LoginContainer';
import DiceContainer from './components/DiceContainer';
import AdminLoginContainer from './components/AdminLoginContainer';
import UsersList from './components/UsersList';

const Router = () => (
    //define path and use component
    <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route exact path="/dice" component={DiceContainer} />
        <Route exact path="/admin-login" component={AdminLoginContainer} />
        <Route exact path="/user-list" component={UsersList} />
    </Switch>
)

export default Router