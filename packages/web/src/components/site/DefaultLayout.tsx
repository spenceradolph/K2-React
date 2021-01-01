// prettier-ignore
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './Navbar';
import { CourseDirector, Credits, Homepage, NotFound, Teacher, Troubleshoot } from './pages';

export const DefaultLayout = () => {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Helmet title="Island Rush V2" />
                    <Homepage />
                </Route>
                <Route exact path="/troubleshoot">
                    <Helmet title="Island Rush Troubleshoot" />
                    <Troubleshoot />
                </Route>
                <Route exact path="/credits">
                    <Helmet title="Island Rush Credits" />
                    <Credits />
                </Route>
                <Route exact path="/teacher">
                    <Helmet title="Island Rush Teacher" />
                    <Teacher />
                </Route>
                <Route exact path="/courseDirector">
                    <Helmet title="Island Rush Course Director" />
                    <CourseDirector />
                </Route>
                <Route path="*">
                    <Helmet title="404: Error" />
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
};
