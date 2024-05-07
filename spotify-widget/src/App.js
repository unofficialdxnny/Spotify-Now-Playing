import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Callback from './callback';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/callback" component={Callback} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
