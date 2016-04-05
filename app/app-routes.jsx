import React from 'react';
import {
    Route,
    Redirect,
    IndexRoute,
} from 'react-router';

import Master from './components/master';
import Home from './components/pages/home';
import Events from './components/pages/events/Page';
import About from './components/pages/about/Page';

const AppRoutes = (
    <Route path="/" component={Master}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Redirect from="events" to="/events/suche" />
        <Route path="events">
            <Route path="suche" component={Events} />
        </Route>
        <Route path="about" component={About} />
    </Route>
);

export default AppRoutes;
