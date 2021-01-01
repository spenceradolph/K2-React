import { FullState } from '@monorepo/common';
import { Properties } from 'csstype';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

const mapStateToProps = ({ auth }: FullState) => ({ auth });
const mapActionsToProps = {};
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

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

export const Game = connector(UnconnectedGame);
