import { DeleteGameAction, GameDeletedAction, GAME_DELETED, SERVER_ACTION, SERVER_REDIRECT } from '@monorepo/common';
import { Socket } from 'socket.io';
import { Game } from '../../classes';

export const deleteGame = async (socket: Socket, action: DeleteGameAction) => {
    const session = socket.request.session;

    if (!session.ir2 || !session.ir2.courseDirector) {
        console.log('bad session');

        socket.emit(SERVER_REDIRECT, 'bad_session');
        return;
    }

    const { gameId } = action.payload;

    const game = await Game.getById(gameId);
    if (!game) {
        // TODO: client error for game_does_not_exist or something
        console.log('failed to get game');
        return;
    }

    await game.delete();

    const gameDeletedAction: GameDeletedAction = {
        type: GAME_DELETED,
        payload: {
            gameId
        }
    };

    socket.emit(SERVER_ACTION, gameDeletedAction);
};
