import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Game } from './game';
import { DefaultLayout } from './site';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/game" component={Game} />
                <Route path="*" component={DefaultLayout} />
            </Switch>
        </Router>
    );
};
