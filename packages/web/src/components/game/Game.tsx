import { FullState } from '@monorepo/common';
import { Properties } from 'csstype';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

export const Game = () => {
    const { auth } = useSelector((state: FullState) => state);

    const history = useHistory();
    useEffect(() => {
        if (!auth.session.game) {
            history.push('/?error=not_authenticated');
        }
    });

    return (
        <div style={gameStyle}>
            <Shop />
            <Inventory />
            <GameInfo />
            <Gameboard />
        </div>
    );
};
