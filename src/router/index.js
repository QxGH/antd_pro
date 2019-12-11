import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import MainLayout from '../page/mainLayout'
import Login from '../page/login'

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={MainLayout} />
    </Switch>
  </HashRouter>
);


export default BasicRoute;