import { GameResetAction, GAME_RESET, ResetGameAction, SERVER_ACTION, SERVER_REDIRECT } from '@monorepo/common';
import { Socket } from 'socket.io';
import { Game } from '../../classes';

export const resetGame = async (socket: Socket, action: ResetGameAction) => {
    const session = socket.request.session;

    if (!session.ir2 || !session.ir2.teacher) {
        console.log('bad session');

        socket.emit(SERVER_REDIRECT, 'bad_session');
        return;
    }

    const { gameId } = session.ir2.teacher;

    const game = await Game.getById(gameId);
    if (!game) {
        // TODO: client error for game_does_not_exist or something? (unlikely this would occur since session was set by us? unless game was deleted by courseDirector without this session being aware)
        console.log('failed to get game');
        return;
    }

    // Resetting a game = deleting old and creating a new with default db values
    // TODO: should change this to not create a new game, but change the old game to the new default values
    const newGame = await game.reset();
    if (!newGame) {
        // TODO: failed to reset error
        console.log('failed to reset game');
        return;
    }

    // session probably needs to change
    session.ir2.teacher.gameId = newGame.gameId;
    session.ir2.teacher.gameActive = newGame.gameActive;
    session.save();

    const gameResetAction: GameResetAction = {
        type: GAME_RESET,
        payload: {
            newGame: session.ir2.teacher // TODO: probably could do without sending, but some cases we may change default values from db (such as gameActive starts as 1 for testing purposes)
        }
    };

    socket.emit(SERVER_ACTION, gameResetAction);
};
