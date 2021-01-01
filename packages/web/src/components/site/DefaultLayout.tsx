// prettier-ignore
import { addGame, adminLogin, deleteGame, FullState, login, resetGame, toggleActive, unauthenticate } from '@monorepo/common';
import { Helmet } from 'react-helmet';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './Navbar';
import { CourseDirector, Credits, Homepage, NotFound, Teacher, Troubleshoot } from './pages';

const mapStateToProps = ({ auth, courseDirector }: FullState) => ({ auth, courseDirector });
const mapActionsToProps = { login, adminLogin, unauthenticate, addGame, deleteGame, toggleActive, resetGame };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const UnconnectedDefaultLayout = (props: Props) => {
    const { auth, login, adminLogin, unauthenticate, courseDirector, addGame, deleteGame, toggleActive, resetGame } = props;

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

export const DefaultLayout = connector(UnconnectedDefaultLayout);
