import React from 'react';
import Homepage from '../components/Homepage';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const AppRouter = () =>
(
    <Router>
        <Switch>
             <Route exact path="/" component={Homepage} />
            <Route  exact path="/dashboard" component={Dashboard}/>
        </Switch>
    </Router>
);

export default AppRouter;