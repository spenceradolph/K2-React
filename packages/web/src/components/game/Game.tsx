import { Properties } from 'csstype';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AuthState, FullState } from '@monorepo/common';
import { Gameboard } from './Gameboard';
import { GameInfo } from './GameInfo';
import { Inventory } from './Inventory';
import { Shop } from './Shop';

const gameStyle: Properties = {
    position: 'relative',
    backgroundColor: '#b9b9b9',
    height: '100vh',
    width: '100vw'
};

interface Props {
    auth: AuthState;
}

export const UnconnectedGame = ({ auth }: Props) => {
    if (!auth.session.game) {
        // TODO: better protected routing / authentication check? (finish a more complete typing of the state)
        return <Redirect to="/?error=not_authenticated" />;
    }

    return (
        <div style={gameStyle}>
            <Shop />
            <Inventory />
            <GameInfo />
            <Gameboard />
        </div>
    );
};

const mapStateToProps = ({ auth }: FullState) => ({
    auth
});
const mapActionsToProps = {};

export const Game = connect(mapStateToProps, mapActionsToProps)(UnconnectedGame);
