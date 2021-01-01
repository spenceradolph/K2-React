import { GameActiveToggledAction, GAME_TOGGLED, SERVER_ACTION, SERVER_REDIRECT, ToggleActiveAction } from '@monorepo/common';
import { Socket } from 'socket.io';
import { Game } from '../../classes';

export const toggleActive = async (socket: Socket, action: ToggleActiveAction) => {
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

    await game.toggleActive();

    session.ir2.teacher.gameActive = game.gameActive;
    session.save();

    const gameActiveToggledAction: GameActiveToggledAction = {
        type: GAME_TOGGLED,
        payload: {
            gameActive: game.gameActive
        }
    };

    socket.emit(SERVER_ACTION, gameActiveToggledAction);
};
