import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// prettier-ignore
import { addGame, adminLogin, AuthState, CourseDirectorState, deleteGame, FullState, login, unauthenticate, toggleActive, resetGame } from '@monorepo/common';
import { Navbar } from './Navbar';
import { CourseDirector, Credits, Homepage, NotFound, Teacher, Troubleshoot } from './pages';

interface Props {
    auth: AuthState;
    courseDirector: CourseDirectorState;
    login: any;
    adminLogin: any;
    unauthenticate: any;
    addGame: any; // TODO: able to set type within courseDirector, but not here...
    deleteGame: any;
    toggleActive: any;
    resetGame: any;
}

// TODO: don't ignore this?
// prettier-ignore
export const UnconnectedDefaultLayout = ({ auth, login, adminLogin, unauthenticate, courseDirector, addGame, deleteGame, toggleActive, resetGame }: Props) => {
    return (
        <div>
            <Navbar unauthenticate={unauthenticate} />
            <Switch>
                <Route exact path="/">
                    <Helmet title="Island Rush V2" />
                    <Homepage auth={auth} login={login} adminLogin={adminLogin} />
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
                    <Teacher resetGame={resetGame} toggleActive={toggleActive} auth={auth} />
                </Route>
                <Route exact path="/courseDirector">
                    <Helmet title="Island Rush Course Director" />
                    <CourseDirector deleteGame={deleteGame} courseDirector={courseDirector} auth={auth} addGame={addGame} />
                </Route>
                <Route path="*">
                    <Helmet title="404: Error" />
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
};

const mapStateToProps = ({ auth, courseDirector }: FullState) => ({ auth, courseDirector });
const mapActionsToProps = {
    login,
    adminLogin,
    unauthenticate,
    addGame,
    deleteGame,
    toggleActive,
    resetGame
};

export const DefaultLayout = connect(mapStateToProps, mapActionsToProps)(UnconnectedDefaultLayout);
